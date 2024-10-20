// Dashboard.jsx
import React, { useState } from 'react';
import ChatBot from './ChatBot';
import CourseSidebar from './CourseSidebar';
import UpcomingEvents from './UpcomingEvents';

const Dashboard = () => {
  const [courses] = useState([
    { id: 1, title: 'Math 101', description: 'Introduction to Algebra' },
    { id: 2, title: 'Physics 201', description: 'Classical Mechanics' },
    { id: 3, title: 'Chemistry 101', description: 'Basic Chemistry' },
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: 'Math 101 Midterm', date: '2024-11-15', time: '10:00 AM' },
    { id: 2, title: 'Physics 201 Lab', date: '2024-11-20', time: '1:00 PM' },
  ]);

  return (
    <div className="dashboard-container flex flex-col lg:flex-row h-screen bg-black text-white">
      {/* Sidebar for Courses */}
      <aside className="sidebar w-full lg:w-1/4 bg-gray-900 p-4 h-full overflow-auto">
        <CourseSidebar courses={courses} />
      </aside>

      {/* Main Content Area */}
      <main className="main-content w-full lg:w-3/4 p-6 flex flex-col space-y-6">
        {/* Upcoming Events Section */}
        <section className="upcoming-events-section flex-grow bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <UpcomingEvents events={upcomingEvents} />
        </section>

        {/* Chat Interface Placeholder */}
        <section className="chat-section bg-gray-800 p-4 rounded-lg">
          <ChatBot />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
  

