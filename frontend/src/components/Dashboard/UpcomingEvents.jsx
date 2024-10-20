import { useEffect, useState, useContext } from 'react';


const UpcomingEvents = () => {
    const [events, setEvents] = useState([
        { title: 'No event found, try connecting Google Calendar or add an Event', date: 'N/a' },
    ]);

    

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch('http://localhost:8000/calendar/fetch-cal', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setEvents(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEvent()
    }, []);

    return (
        <div>
            {events.map((event, index) => (
                <div key={index}>
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                </div>
            ))}
        </div>
    );
};

export default UpcomingEvents;