// UpcomingEvents.jsx
import React from 'react';

const UpcomingEvents = ({ events }) => {
  return (
    <div className="upcoming-events">
      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-gray-700 rounded-md shadow">
              <strong>{event.title}</strong>
              <p>{event.date} at {event.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;