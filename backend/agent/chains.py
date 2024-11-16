from dotenv import load_dotenv
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnableBranch
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

model = ChatOpenAI(model="gpt-3.5-turbo")

intent_classification_prompt = ChatPromptTemplate.from_messages([
    ("system", """
        You are a calendar assistant and syllabus assisant. Determine if the user wants to "create" or "view" an event.
        Reply with "create_event" or "view_event" based on user intent.
    """),
    ("human", "{user_input}")
])


class EventDetails(BaseModel):
    summary: str = Field(description="Title or summary of the event")
    start: dict = Field(description="Start time with dateTime and timeZone")
    end: dict = Field(description="End time with dateTime and timeZone")
    description: str = Field(description="Description of the event")


#Prompt Templates
create_event_prompt_template = ChatPromptTemplate.from_messages(
    [("system", """
        You are an assistant that helps users create events on Google Calendar.
        When a user provides event details in natural language, extract the information and format it as a JSON object in the following format. 
        If any field is missing, ask the user to provide the necessary details to complete the event creation:

        {{
            "summary": "<event summary>",
            "location": "<event location>",
            "description": "<event description>",
            "start": {{
                "dateTime": "<start date and time>",
                "timeZone": "America/Los_Angeles"
            }},
            "end": {{
                "dateTime": "<end date and time>",
                "timeZone": "America/Los_Angeles"
            }},
            "recurrence": [
                "<recurrence rule, if any>"
            ],
            "attendees": [
                {{"email": "<attendee 1 email>"}},
                {{"email": "<attendee 2 email>"}}
            ],
            "reminders": {{
                "useDefault": False,
                "overrides": [
                    {{"method": "email", "minutes": 10}},
                    {{"method": "popup", "minutes": 5}}
                ]
            }}
        }}
        
        User input: {user_input}
        
        Carefully parse the user input, fill in the event details, and request any missing information.
    """)]
)


get_event_prompt_template = ChatPromptTemplate.from_messages(
    [("system", """
        You are an assistant that helps users retrieve events from Google Calendar.
        When a user asks for events, look for specific filters in their request, such as time range or keywords like "exam" or "meeting."
        
        Use the user's input to apply these filters and return a summary of events that match the criteria. If no specific filters are provided, return the next few upcoming events by default.

        User input: {user_input}
        
        Parse the user's input and apply relevant filters to retrieve and summarize matching events.
    """)]
)






