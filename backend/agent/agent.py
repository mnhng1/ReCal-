from dotenv import load_dotenv
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder
)
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage
from .tools import create_event_tool, view_event_tool, tools
import os
import logging
from .models import ChatMessage
from django.contrib.auth.models import User



load_dotenv()  
logger = logging.getLogger(__name__)




OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


class CalendarAgent:
    
    logger.info("Initializing CalendarAgent")
    def __init__(self, user: User):
        self.user = user
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", api_key = OPENAI_API_KEY)
        self.chat_history = self.load_chat_history()

        
        

        self.event_details_parser = EventDetailsParser()

        self.intent_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                "You are a calendar assistant. Determine if the user wants to:\n"
                "1. 'create_event' (schedule, create, book, add an event)\n"
                "2. 'view_event' (check, show, find, view events)\n"
                "Respond with only 'create_event' or 'view_event'."
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}")
        ])

        self.intent_chain = self.intent_prompt | self.llm
        

        self.view_event_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                "You are a calendar assistant that helps users view their events.\n"
                "Extract time filters from the user's request and format them appropriately.\n\n"
                "Examples:\n"
                "- 'Show my events for today' → timeMin: today's start, timeMax: today's end\n"
                "- 'What meetings do I have next week' → timeMin: next week's start, timeMax: next week's end\n"
                "- 'Show my upcoming events' → timeMin: now, maxResults: 10\n\n"
                "Format the response as a JSON object with these fields:\n"
                "{\n"
                "    'time_min': 'ISO datetime',\n"
                "    'time_max': 'ISO datetime' (optional),\n"
                "    'max_results': number (default 10),\n"
                "    'single_events': boolean (default true),\n"
                "    'order_by': 'startTime'\n"
                "}"
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}")
        ])
        self.view_event_chain = self.view_event_prompt | self.llm

        
        self.create_event_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(
                "You are a calendar assistant that creates events. Extract event details from user input into a Google Calendar format.\n"
                "If any required fields are missing, check the chat history before asking for clarification.\n"
                "Required JSON format:\n"
                "{\n"
                "    'summary': '<event title>',\n"
                "    'location': '<location>',\n"
                "    'description': '<description>',\n"
                "    'start': {\n"
                "        'dateTime': '<YYYY-MM-DDTHH:MM:SS>',\n"
                "        'timeZone': 'America/Los_Angeles'\n"
                "    },\n"
                "    'end': {\n"
                "        'dateTime': '<YYYY-MM-DDTHH:MM:SS>',\n"
                "        'timeZone': 'America/Los_Angeles'\n"
                "    },\n"
                "    'recurrence': ['<RRULE:FREQ=DAILY;COUNT=1>'],\n"
                "    'attendees': [\n"
                "        {'email': '<attendee1@example.com>'}\n"
                "    ],\n"
                "    'reminders': {\n"
                "        'useDefault': false,\n"
                "        'overrides': [\n"
                "            {'method': 'email', 'minutes': 10},\n"
                "            {'method': 'popup', 'minutes': 5}\n"
                "        ]\n"
                "    }\n"
                "}"
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}")
        ])
        self.create_event_chain = self.create_event_prompt | self.llm


    def load_chat_history(self):
            messages = ChatMessage.objects.filter(user = self.user).order_by('timestamp')
            history = []
            for msg in messages:
                if msg.role == 'user':
                    history.append(HumanMessage(content=msg.content))
                else:
                    history.append(AIMessage(content = msg.content))
            return history


    def process_input(self, user_input:str):
        try:
            #Save user message
            ChatMessage.objects.create(user=self.user, role = 'user', content = user_input)
            self.chat_history.append(HumanMessage(content = user_input))
            
            #determine the intent of input
            intent_response = self.intent_chain.invoke(
                {
                    "chat_history": self.chat_history,
                    "input": user_input
                }
            )
            intent = intent_response.strip()

            if intent == "create_event":
                #Process event creation
                event_details_response = self.create_event_chain.invoke({
                    "chat_history": self.chat_history,
                    "input": user_input
                })
                event_details = event_details_response.content
                result = create_event_tool.func(self.user, event_details)
            #Process event viewing
            elif intent == "view_event":
                filters_response = self.view_event_chain.invoke({
                    "chat_history": self.chat_history,
                    "input": user_input
                })
                filters = filters_response.content
                result = view_event_tool.func(self.user, filters)
            else:
                result = "Sorry, I didn't understand that."
            
            #Save chat to history
            ChatMessage.objects.create(user=self.user, role = 'assistant', content = result)
            self.chat_history.append(AIMessage(content=result))

            return result
        except Exception as e:
            logger.error(f"Error processing input for user {self.user.id}: {str(e)}")
            return "An error occurred while processing your request."
                

            
    
        
