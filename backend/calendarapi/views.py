from django.shortcuts import render
from django.http import JsonResponse
from allauth.socialaccount.models import SocialToken
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import datetime
from django.contrib.auth.decorators import login_required
# Create your views here.


def fetch_google_calendar_events(request):
    user = request.user

    try:
        social_token = SocialToken.objects.get(account__user = user, account__provider='google')
    except SocialToken.DoesNotExist:
        return JsonResponse({'error': 'Google OAuth token not found'}, status=401)
    creds = Credentials(token = social_token.token)
    service = build('calendar', 'v3', credentials = creds)
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    ten_days_from_now = (datetime.datetime.utcnow() + datetime.timedelta(days=10)).isoformat() + 'Z'
    events_result = service.events().list(
        calendarId='primary', timeMin=now, timeMax=ten_days_from_now,
        maxResults=10, singleEvents=True, orderBy='startTime'
    ).execute()
    events = events_result.get('items', [])

    event_data = []

    for event in events:
        event_data.append({
            'id': event['id'],
            'title': event['summary'],
            'start_time': event['start'].get('dateTime', event['start'].get('date')),
            'end_time': event['end'].get('dateTime', event['end'].get('date')),
        })

    return JsonResponse({'events': event_data})


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