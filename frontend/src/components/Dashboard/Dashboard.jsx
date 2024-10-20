"use client"

import { useState, useRef, useEffect } from 'react'
import { PlusCircle, Settings, Send, Paperclip, ChevronRight, X } from "lucide-react"


const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
)

const Input = ({ className, ...props }) => (
  <input className={`px-3 py-2 rounded-md text-sm ${className}`} {...props} />
)

const ScrollArea = ({ children, className, ...props }) => (
  <div className={`overflow-auto ${className}`} {...props}>{children}</div>
)

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [courses, setCourses] = useState([])
  const [activeCourse, setActiveCourse] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [newCourse, setNewCourse] = useState({ name: '', instructor: '', pdf: null })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [events, setEvents] = useState([
    { title: 'Team Meeting', date: 'Tomorrow, 10:00 AM' },
    { title: 'Project Deadline', date: 'Friday, 5:00 PM' },
    { title: 'Webinar: AI in Education', date: 'Next Monday, 2:00 PM' },
  ])
  const [reminders, setReminders] = useState([
    { title: 'Submit assignment', course: 'Math 101' },
    { title: 'Review lecture notes', course: 'History 202' },
  ])
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [popupType, setPopupType] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = 'This is a simulated AI response.'
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
        
        if (aiResponse.toLowerCase().includes('event') || aiResponse.toLowerCase().includes('reminder')) {
          setShowAddPopup(true)
          setPopupType(aiResponse.toLowerCase().includes('event') ? 'event' : 'reminder')
        }
      }, 1000)
    }
  }

  const handleAddCourse = () => {
    if (courses.length < 5 && newCourse.name && newCourse.instructor && newCourse.pdf) {
      setCourses([...courses, newCourse])
      setNewCourse({ name: '', instructor: '', pdf: null })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index)
    setCourses(newCourses)
    setActiveCourse(null)
  }

  const handleAddEvent = (title, date) => {
    setEvents([...events, { title, date }])
  }

  const handleAddReminder = (title, course) => {
    setReminders([...reminders, { title, course }])
  }

  const isFormValid = newCourse.name && newCourse.instructor && newCourse.pdf

  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Sidebar */}
      <div 
        className={`${isExpanded ? 'w-64' : 'w-16'} bg-black border-r border-gray-800 p-4 flex flex-col transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <h1 className={`text-2xl font-bold mb-4 overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Dashboard</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="mb-4 justify-center" disabled={courses.length >= 5}>
          <PlusCircle className="h-4 w-4" />
          {isExpanded && <span className="ml-2">New Course</span>}
        </Button>
        {courses.map((course, index) => (
          <Button key={index} className="justify-start mb-2" onClick={() => setActiveCourse(index)}>
            <ChevronRight className="mr-2 h-4 w-4" />
            {isExpanded && <span className="truncate">{course.name}</span>}
          </Button>
        ))}
        <div className="flex-grow"></div>
        <Button className="justify-center" onClick={() => setShowSettings(true)}>
          <Settings className="h-4 w-4" />
          {isExpanded && <span className="ml-2">Settings</span>}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeCourse !== null ? (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{courses[activeCourse].name}</h2>
            <p className="mb-4">Instructor: {courses[activeCourse].instructor}</p>
            {courses[activeCourse].pdf && (
              <iframe 
                src={URL.createObjectURL(courses[activeCourse].pdf)} 
                className="w-full h-[calc(100vh-200px)]"
                title={`${courses[activeCourse].name} Syllabus`}
              />
            )}
            <Button onClick={() => setActiveCourse(null)} className="mt-4 mr-2">Close</Button>
            <Button onClick={() => handleDeleteCourse(activeCourse)} className="mt-4 bg-red-600">Delete Course</Button>
          </div>
        ) : showSettings ? (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <Input placeholder="Username" className="mb-4 w-full" />
            <Button className="mr-2">Log Out</Button>
            <Button>Connect with Google</Button>
            <Button onClick={() => setShowSettings(false)} className="mt-4">Close</Button>
          </div>
        ) : (
          <>
            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 min-h-[300px]">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
                    {message.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 relative">
              <div className="flex items-center border border-gray-800 rounded-lg overflow-hidden">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sloth a question..."
                  className="flex-grow bg-black border-none focus:ring-0"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} className="bg-black hover:bg-gray-800">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {showAddPopup && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg">
                  <Button onClick={() => {
                    setShowAddPopup(false)
                    if (popupType === 'event') {
                      handleAddEvent('New Event', 'Date TBD')
                    } else {
                      handleAddReminder('New Reminder', 'Course TBD')
                    }
                  }}>
                    Add to {popupType === 'event' ? 'Events' : 'Reminders'}
                  </Button>
                </div>
              )}
            </div>

            {/* Events and Reminders */}
            <div className="p-4 border-t border-gray-800 flex">
              <div className="flex-1 mr-2">
                <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {events.map((event, index) => (
                    <li key={index}>{event.title} - {event.date}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 ml-2">
                <h2 className="text-lg font-semibold mb-2">Reminders</h2>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {reminders.map((reminder, index) => (
                    <li key={index}>{reminder.title} - {reminder.course}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Course Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add New Course">
        <Input 
          placeholder="Class Name" 
          value={newCourse.name}
          onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
          className="mb-2 w-full" 
        />
        <Input 
          placeholder="Instructor" 
          value={newCourse.instructor}
          onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
          className="mb-2 w-full" 
        />
        <Input 
          type="file" 
          accept=".pdf"
          onChange={(e) => setNewCourse({...newCourse, pdf: e.target.files[0]})}
          className="mb-2 w-full" 
        />
        <Button onClick={handleAddCourse} disabled={!isFormValid} className="w-full">Add Course</Button>
      </Dialog>
    </div>
  )
}