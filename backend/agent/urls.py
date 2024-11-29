from django.urls import path
from .views import chat_with_ai, get_events, create_events

urlpatterns = [
    path('chat/', chat_with_ai, name='chat_with_ai'),
    path('create-events/', create_events, name='create_events'),
    path('get-events/', get_events, name='get_events'),
]