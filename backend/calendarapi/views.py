from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from langchain.agents import Tool
from django.http import JsonResponse
from allauth.socialaccount.models import SocialToken



def get_google_calendar_service(user):
    user = request.user
    social_token = SocialToken.objects.get(account__user=user, account__provider='google')
    creds = Credentials(token=social_token.token)
    return build('calendar', 'v3', credentials=creds)


def view_google_calendar_events(user, time_min):
    service = get_google_calendar_service(user)
    view_tool = GoogleCalendarViewTool(service=service)
    response = view_tool._call(user_input)  
    return JsonResponse({'events': response})

def create_google_calendar_events(request):

    social_token = SocialToken.objects.get(account__user = user, account_provider = 'google')
    creds = Credentials(token = social_token.token)
    service = build('calendar', 'v3', credentials= creds)
    event = {
        'summary': event_details['summary'],
        'start': {'dateTime': event_details['start_time'], 'timeZone': 'America/New_York'},
        'end': {'dateTime': event_details['end_time'], 'timeZone': 'America/New_York'},
    }
    created_event = service.events().insert(calendarId='primary', body=event).execute()
    response = create_tool._call(user_input)
    return JsonResponse({'event': repsonse})