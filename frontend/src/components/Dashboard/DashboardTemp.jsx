'use client'

import React, { useState } from 'react'
import { FiMenu, FiPlus, FiMessageSquare, FiSend } from 'react-icons/fi'

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a simulated AI response.' }])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-gray-800 ">
            <h2 className="text-xl font-semibold text-gray-100">AI Dashboard</h2>
          </div>
          <nav className="flex-1 overflow-auto p-4">
            <ul className="space-y-2">
              <li>
                <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-gray-100">
                  <FiPlus className="mr-3 h-5 w-5" />
                  New Chat
                </button>
              </li>
              <li>
                <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-gray-100">
                  <FiMessageSquare className="mr-3 h-5 w-5" />
                  Chat History
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden ">
        {/* Mobile Header */}
        <header className="flex h-16 items-center border-b border-gray-800 bg-gray-900 px-4 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-gray-100"
          >
            <FiMenu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
          <h1 className="ml-4 text-lg font-semibold text-gray-100">AI Dashboard</h1>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4 bg-black w-full">
          <div className="mx-auto w-full space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-sm ${
                    message.role === 'user'
                      ? 'bg-gray-800 text-gray-100'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="  p-4">
          <div className="mx-auto flex max-w-2xl">
            <input
              type="text"
              className="flex-1 rounded-l-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 focus:border-gray-600 focus:outline-none"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="rounded-r-lg bg-gray-700 px-4 py-2 text-gray-100 hover:bg-gray-600 focus:outline-none"
              onClick={handleSend}
            >
              <FiSend className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}