from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class Reminder(BaseModel):
    method: str
    minutes: int

class ReminderSettings(BaseModel):
    useDefault: bool = False
    overrides: List[Reminder]

class EventDetails(BaseModel):
    summary: str = Field(description="Title of the event")
    location: Optional[str] = Field(default=None, description="Location of the event")
    description: Optional[str] = Field(default=None, description="Description of the event")
    start: Dict[str, str] = Field(description="Start time with dateTime and timeZone")
    end: Dict[str, str] = Field(description="End time with dateTime and timeZone")
    recurrence: Optional[List[str]] = Field(default=None, description="Recurrence rules (RRULE)")
    attendees: Optional[List[Dict[str, str]]] = Field(default=None, description="List of attendee emails")
    reminders: Optional[ReminderSettings] = Field(
        default=ReminderSettings(
            useDefault=False,
            overrides=[
                Reminder(method="email", minutes=24 * 60),
                Reminder(method="popup", minutes=10)
            ]
        ),
        description="Reminder settings"
    )

class EventDetailsParser(PydanticOutputParser):
    def __init__(self):
        super().__init__(pydantic_object=EventDetails)
    
    def parse(self, text: str) -> EventDetails:
        try:
            # Parse JSON string to dict
            json_obj = json.loads(text)
            
            # Ensure datetime format is correct
            for time_field in ['start', 'end']:
                if time_field in json_obj and 'dateTime' in json_obj[time_field]:
                    # Ensure proper ISO format
                    datetime_str = json_obj[time_field]['dateTime']
                    # Add timezone if not present
                    if not datetime_str.endswith('Z') and not any(c in datetime_str for c in '+-'):
                        json_obj[time_field]['dateTime'] = f"{datetime_str}-07:00"
            
            # Convert dict to EventDetails object
            return EventDetails(**json_obj)
        except Exception as e:
            raise OutputParserException(f"Failed to parse event details: {str(e)}\nReceived text: {text}")