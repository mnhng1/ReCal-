// ChatBot.jsx
import React from 'react';

const ChatBot = () => {
  return (
    <div className="chatbot h-64 flex flex-col">
      <div className="messages bg-gray-700 p-4 rounded-md flex-grow">
        <p>Chat messages will appear here...</p>
      </div>
      <div className="input-section mt-4">
        <input
          type="text"
          placeholder="Ask something like 'When are my exams?'"
          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
        />
      </div>
    </div>
  );
};

export default ChatBot;
