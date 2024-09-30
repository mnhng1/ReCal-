// CourseSidebar.jsx
import React from 'react';

const CourseSidebar = ({ courses }) => {
  return (
    <div className="course-sidebar">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="p-4 bg-gray-700 rounded-md shadow">
            <strong>{course.title}</strong>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSidebar;