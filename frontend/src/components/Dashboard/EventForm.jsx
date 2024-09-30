import React, { useState } from 'react';

const EventForm = ({ createEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent({ title, description, date });
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form p-4 bg-gray-200 rounded-md">
      <h3 className="text-lg font-bold mb-4">Create Event</h3>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Create Event</button>
    </form>
  );
};

export default EventForm;