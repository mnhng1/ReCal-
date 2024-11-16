from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from langchain.agents import Tool
from django.http import JsonResponse
from allauth.socialaccount.models import SocialToken



def get_google_calendar_service(user):
    user = request.user
    social_token = SocialToken.objects.get(account__user=user, account__provider='google')
    if not social_token:
        raise Exception("Google token not found for user")
    creds = Credentials(token=social_token.token)
    return build('calendar', 'v3', credentials=creds)


def view_google_calendar_events(user, filters):
    service = get_google_calendar_service(user = user)
    time_min = filters.get('time_min', '2024-01-01T00:00:00Z')  # Set default time for demo
    return service.events().list(calendarId='primary', timeMin=time_min, maxResults=10).execute().get('items', [])

def create_google_calendar_events(user, event_details):
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

get_event_tool = Tool(
    name = "GetEventTool",
    description= "Get Google Calendar event(s) with provided details",
    func= create_google_calendar_events
)


tools = [create_event_tool, get_event_tool]