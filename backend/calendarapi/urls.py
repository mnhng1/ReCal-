from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import fetch_google_calendar_events,create_google_calendar_events, view_google_calendar_events

urlpatterns = [
    path('fetch-cal', fetch_google_calendar_events, name = 'fetch_events' ),
    path('view/', view_google_calendar_events, name = "view_events" ),
    path('create/', create_google_calendar_events, name = "create_events" ),
] 