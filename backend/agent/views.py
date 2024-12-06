# backend/agent/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from langchain_openai import ChatOpenAI
from .memory import InMemoryChatMessageHistory
from dotenv import load_dotenv
from .tools import create_google_calendar_events, view_google_calendar_events
import os
from .agent import CalendarAgent


@login_required
@csrf_exempt
def chat_with_ai(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get('query', '')
        user = request.user

        agent = CalendarAgent()
        response = agent.process_input(user_input)
        
        return JsonResponse({
            'response': response
        })
    return JsonResponse({'error': 'Invalid request method'}, status=400)





