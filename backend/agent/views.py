# backend/agent/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_openai import ChatOpenAI
from .memory import InMemoryChatMessageHistory
from dotenv import load_dotenv
import os


load_dotenv()


chat_history = InMemoryChatMessageHistory()


model = ChatOpenAI(model="gpt-3.5-turbo")

@csrf_exempt
def chat_with_ai(request):
    if request.method == 'POST':
        user_input = request.POST.get('input', '')
        session_id = request.POST.get('session_id', 'default_session')

        # Save the message to Firestore
        chat_history.save_message(session_id, 'user', user_input)

        # Generate a response using LangChain
        ai_response = model.invoke(chat_history.get_messages(session_id))

        # Save the AI response to Firestore
        chat_history.save_message(session_id, 'ai', ai_response.content)

        return JsonResponse({'response': ai_response.content})
    return JsonResponse({'error': 'Invalid request method'}, status=400)