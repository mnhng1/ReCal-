
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_google_firestore import  FirestoreChatMessageHistory
from langchain.agents import Tool
from langchain.agents import ZeroShotAgent, AgentExecutor
from .tools import create_event_tool, view_event_tool, tools
import os
from .chains import branches

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableBranch, RunnableLambda
from langchain_core.output_parsers import StrOutputParser


from google.cloud import firestore

load_dotenv()  


PROJECT_ID = "sloth-18837"
SESSION_ID = "user_session_new"
COLLECTION_NAME  = "chat_history"

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

model = ChatOpenAI(model="gpt-3.5-turbo")



print("Firestore intiliazing")
client = firestore.Client(project=PROJECT_ID)

chat_history = FirestoreChatMessageHistory(
    session_id = SESSION_ID,
    collection = COLLECTION_NAME,
    client = client
)


class CalendarAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo")
        
        self.intent_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a calendar assistant. Determine if the user wants to:
                1. "create_event" (schedule, create, book, add an event)
                2. "view_event" (check, show, find, view events)
                Respond with only "create_event" or "view_event"."""),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}")
        ])

        
        self.create_event_chain = (
            ChatPromptTemplate.from_messages([
                ("system", """You are a calendar assistant that creates events. Extract event details from user input into a Google Calendar format.
                    If any required fields are missing, check the chat history before asking for clarification."""),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", """Please format this request as a Google Calendar event:
                    {input}
                    
                    Required JSON format:
                    {
                        "summary": "<event title>",
                        "location": "<location>",
                        "description": "<description>",
                        "start": {
                            "dateTime": "<YYYY-MM-DDTHH:MM:SS>",
                            "timeZone": "America/Los_Angeles"
                        },
                        "end": {
                            "dateTime": "<YYYY-MM-DDTHH:MM:SS>",
                            "timeZone": "America/Los_Angeles"
                        },
                        "recurrence": ["<RRULE:FREQ=DAILY;COUNT=1>"],
                        "attendees": [
                            {"email": "<attendee1@email.com>"}
                        ],
                        "reminders": {
                            "useDefault": false,
                            "overrides": [
                                {"method": "email", "minutes": 10},
                                {"method": "popup", "minutes": 5}
                            ]
                        }
                    }""")
            ])
            | self.llm 
            | EventDetailsParser() 
            | create_event_tool
        )

    self.view_event_chain = ChatPromptTemplate.from_message(
        input_variables=['user_input'],
    )
        
