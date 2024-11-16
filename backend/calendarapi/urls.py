from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import fetch_google_calendar_events

urlpatterns = [
    path('fetch-cal', fetch_google_calendar_events, name = 'fetch_events' )
] 