

import  { useState } from 'react'
import { FiMenu, FiPlus, FiMessageSquare, FiSend, FiLogIn } from 'react-icons/fi'
import LogoutButton from './LogoutButton'
import Sidebar from './ChatUI/Sidebar'
import ChatWindow from './ChatUI/ChatWindow'



export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')


  const handleSend = async (userInput) => {
    const newMessages = [...messages, { role: 'user', content: userInput }]
    setMessages(newMessages)
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:8000/chat/', {
        methods: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setMessages(...newMessages, {role: 'assistant', content: data.response})

    } catch (error){
      console.error('Error sending message:', error)
      setMessages(...newMessages, {role: 'assistant', content: 'Sorry, something went wrong.' })
    }

  }

  
    
    return (
      <div className='w-full h-screen bg-gray-500 flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        <ChatWindow messages={messages} onSend={handleSend} />
      </div>

      {/* Logout Button */}
      
      <LogoutButton />
      </div>
    );
      

}