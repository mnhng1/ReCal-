// UpcomingEvents.jsx
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const UpcomingEvents = ({ events }) => {
  
    const [events, setEvents] = useState([
    { title: 'No event found, try connecting Google Calendar or add an Event', date: 'N/a' },
    
    ])
  

    useEffect(() => {
      const fetchEvent = async () => {
        try{
          const response = await fetch('http:localhost:8000/calendar/fetch-event',{
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer your-token-here',
            },
          }) 

          if (!response.ok){
            throw new Error((`HTTP error! status: ${response.status}`));
          }

          const result = await response.json();
          setData(result);
        } catch(e){
          console.log(error)
        }
      } 
      


    },[events])



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

UpcomingEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UpcomingEvents;