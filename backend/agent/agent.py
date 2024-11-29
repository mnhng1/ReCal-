
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
        

        self.event_details_parser = EventDetailsParser()

        self.intent_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a calendar assistant. Determine if the user wants to:
                1. "create_event" (schedule, create, book, add an event)
                2. "view_event" (check, show, find, view events)
                Respond with only "create_event" or "view_event"."""),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}")
        ])

        self.intent_chain = (
            self.intent_prompt | self.llm
        )

        self.view_event_chain = (
             ChatPromptTemplate.from_messages([
                ("system", """You are a calendar assistant that helps users view their events.
                    Extract time filters from the user's request and format them appropriately.
                    
                    Examples:
                    - "Show my events for today" → timeMin: today's start, timeMax: today's end
                    - "What meetings do I have next week" → timeMin: next week's start, timeMax: next week's end
                    - "Show my upcoming events" → timeMin: now, maxResults: 10
                    
                    Format the response as a JSON object with these fields:
                    {
                        "time_min": "ISO datetime",
                        "time_max": "ISO datetime" (optional),
                        "max_results": number (default 10),
                        "single_events": boolean (default true),
                        "order_by": "startTime"
                    }"""),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}")
            ])
            | self.llm 
            | view_event_tool
        )

        
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
            | self.event_details_parser
            | create_event_tool
        )

        def process_input(self, input):
            try:
                intent_response = self.intent_chain.run(
                    {
                        "chat_history": chat_history.messages,
                        "input": user_input
                    }
                )

                intent = intent_response.strip()

                if intent == "create_event":
                    event_details = self.create_event_chain.run({
                        "chat_history": chat_history.messages,
                        "input": user_input
                    })
                    result = create_event_tool.func(user, event_details)
                    return result
                elif intent == "view_event":
                    filters = self.view_event_chain.run({
                        "chat_history": chat_history.messages,
                        "input": user_input
                    })
                    events = get_event_tool.func(user, filters)
                    return events
                else:
                    return "Sorry, I didn't understand that."
            except Exception as e:
                return f"An error occurred: {str(e)}"
                

            
    
        
