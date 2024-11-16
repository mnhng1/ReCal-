from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI 
from langchain_core.messages import HumanMessage
from langchain_google_firestore import  FirestoreChatMessageHistory
 
from langchain.prompts import ChatPromptTemplate


#Generate a prompt template that parse natural language into json format for Google Event Creattion#

def CreateEventTemplate(user_input):
    
    chat_model = ChatOpenAI(temperature=0)

    
    create_prompt_template = ChatPromptTemplate.from_message(
        input_variables=['user_input'],
        template="""
        You are an assistant that schedules events or return events on Google Calendar. A user will provide you with event details in a natural language format. If user want to get existing events, specify time filters if provided and return a summary of matching events.
        If user want to create an event, your task is to extract the relevant information and generate a JSON object in the following format. If a field is missing, determine the nature of the event details and ask back neccessary details to complete:
        
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
        
        Parse the user input carefully and fill in the details.
         
        """
    )

    
    formatted_prompt = prompt_template.format(user_input=user_input)
    response = chat_model([HumanMessage(content=formatted_prompt)])
    return response.content

# Example of an unstructured input provided by the user
user_input = "Create a reminder to go to gym every tuesday at 9 am"

# Invoke the function
generated_event = CreateEventTemplate(user_input)
print(generated_event)