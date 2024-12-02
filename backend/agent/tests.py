from django.test import TestCase
from agent.parsers import EventDetailsParser, ViewEventParser
from agent.parsers import EventDetails, ViewEventFilters
import json

"""Test for parser"""

class ParserTests(TestCase):
    def test_event_details_parser_valid_input(self):
        parser = EventDetailsParser()
        input_data = json.dumps({
            "summary": "Meeting",
            "location": "Office",
            "description": "Project discussion",
            "start": {"dateTime": "2024-05-01T10:00:00-07:00", "timeZone": "America/Los_Angeles"},
            "end": {"dateTime": "2024-05-01T11:00:00-07:00", "timeZone": "America/Los_Angeles"},
            "recurrence": ["RRULE:FREQ=DAILY;COUNT=1"],
            "attendees": [{"email": "attendee@example.com"}],
            "reminders": {
                "useDefault": False,
                "overrides": [
                    {"method": "email", "minutes": 1440},
                    {"method": "popup", "minutes": 10}
                ]
            }
        })
        event = parser.parse(input_data)
        self.assertIsInstance(event, EventDetails)
        self.assertEqual(event.summary, "Meeting")

    def test_view_event_parser_valid_input(self):
        parser = ViewEventParser()
        input_data = json.dumps({
            "time_min": "2024-05-01T00:00:00Z",
            "time_max": "2024-05-07T23:59:59Z",
            "max_results": 5,
            "single_events": True,
            "order_by": "startTime"
        })
        filters = parser.parse(input_data)
        self.assertIsInstance(filters, ViewEventFilters)
        self.assertEqual(filters.single_events, True)


class CalendarAgentTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.agent = CalendarAgent(user=self.user)
    
    def test_intent_recognition_create_event(self):
        user_input = "Schedule a meeting tomorrow at 10 AM"
        intent_response = self.agent.intent_chain.invoke({
            "chat_history": self.agent.chat_history,
            "input": user_input
        })
        intent = intent_response.content.strip()
        self.assertEqual(intent, "create_event")

    def test_process_input_view_event(self):
        user_input = "What events do I have this week?"
        response = self.agent.process_input(user_input)
        self.assertIn("Here are your upcoming events", response)