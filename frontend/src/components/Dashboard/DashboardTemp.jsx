

import  { useState } from 'react'
import { FiMenu, FiPlus, FiMessageSquare, FiSend, FiLogIn } from 'react-icons/fi'
import LogoutButton from './LogoutButton'
import Sidebar from './ChatUI/Sidebar'
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
      <div className='w-full h-screen  bg-white'>
        {/*Side bar */}
        <Sidebar></Sidebar>
        <LogoutButton></LogoutButton>
      </div>
    );
      

}