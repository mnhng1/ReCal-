// SyllabusView.jsx
import React from 'react';

const SyllabusView = ({ syllabusData }) => {
  return (
    <div className="syllabus-view">
      <h2 className="text-xl font-bold mb-4">Your Syllabus</h2>
      <ul className="space-y-4">
        {syllabusData.map((item, index) => (
          <li key={index} className="p-4 bg-white rounded-md shadow">
            <strong>{item.title}</strong> - {item.description} on {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SyllabusView;