from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from langchain.agents import Tool
from django.http import JsonResponse
from allauth.socialaccount.models import SocialToken
from langchain.llms import OpenAI




def parse_user_input(request):
    llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0)
    user_input = request.POST.get('input', '')

    tools = [
    Tool(
        name="Google Calendar",
        func=google_calendar_api_call,  # Function to call Google Calendar
        description="Use this tool to create or view Google Calendar events."
    ),
    ]
    
    agent = initialize_agent(tools=tools, llm=llm, agent_type="zero-shot-react-description")


def view_google_calendar_events(request):

    user_input = request.POST.get('input', '')

    
    user = request.user
    social_token = SocialToken.objects.get(account__user=user, account__provider='google')
    creds = Credentials(token=social_token.token)

   
    service = build('calendar', 'v3', credentials=creds)

    
    view_tool = GoogleCalendarViewTool(service=service)
    response = view_tool._call(user_input)  

    return JsonResponse({'events': response})


def create_google_calendar_events(request):

    user_input = request.POST.get('input', ' ')

    user = request.user
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

def make_events(request):
    user = request.user

    try :
        social_token = SocialToken.objects.get(account__user = user, account__provider='google')
    except SocialToken.DoesNotExist:
        return JsonResponse({'error': 'Google OAuth token not found'}, status=401)
    event = request.event
    creds = Credentials(token = social_token.token)
    service = build('calendar', 'v3', credentials = creds)

    event = service.events().insert(calendarId='primary', body=event).execute()
    print ('Event created: %s' % (event.get('htmlLink')))