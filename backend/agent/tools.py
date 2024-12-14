from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from langchain.agents import Tool
from django.http import JsonResponse
from .parsers import EventDetailsParser, ViewEventParser
from datetime import datetime, timedelta



def get_google_calendar_service(user):
    user = user
    social_token = SocialToken.objects.get(account__user=user, account__provider='google')
    if not social_token:
        raise Exception("Google token not found for user")
    creds = Credentials(token=social_token.token)
    return build('calendar', 'v3', credentials=creds)


def view_google_calendar_events(user, filters):
    parser = ViewEventParser()
    try:
        validated_filters = parser.parse(filters)
    except Exception as e:
        validated_filters = {
            'time_min': (datetime.utcnow() - timedelta(days=1)).isoformat() + 'Z',  # 1 day ago
            'time_max': (datetime.utcnow() + timedelta(days=7)).isoformat() + 'Z',  # 1 week from now
            'max_results': 10,
            'single_events': True,
            'order_by': 'startTime'
        }
        
    service = get_google_calendar_service(user = user)
    
    request = service.events().list(
        calendarId='primary',
        timeMin=validated_filters.time_min,
        timeMax=validated_filters.time_max,
        maxResults=validated_filters.max_results,
        singleEvents=validated_filters.single_events,
        orderBy=validated_filters.order_by
    )
    
    events_result = request.execute()
    return events_result.get('items', [])

def create_google_calendar_events(user, event_details):
    parser = EventDetailsParser()
    try:
        validated_event = parser.parse(event_details)
    except Exception as e:
        return {"error": f"Invalid event format: {str(e)}"}
    service = get_google_calendar_service(user = user)
    event = {
        'summary': event_details.summary,
        'location': event_details.location,
        'description': event_details.description,
        'start': event_details.start,
        'end': event_details.end,
        'recurrence': event_details.recurrence,
        'attendees': event_details.attendees,
        'reminders': event_details.reminders.dict()
    }
    return service.events().insert(calendarId='primary', body=event).execute()



create_event_tool = Tool(
    name = "CreateEventTool",
    description= "Creates a Google Calendar event with provided details",
    func= create_google_calendar_events
)

view_event_tool = Tool(
    name = "GetEventTool",
    description= "Get Google Calendar event(s) with provided details",
    func= view_google_calendar_events
)


tools = [create_event_tool, view_event_tool]