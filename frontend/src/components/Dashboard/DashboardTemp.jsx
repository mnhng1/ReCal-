import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Settings, Send, Paperclip, ChevronRight, X } from "lucide-react"
import CourseView from './CourseView'
import SettingsView from './SettingView'

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
        
        // Check if the message might be an event or reminder
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4 justify-center" disabled={courses.length >= 5}>
              <PlusCircle className="h-4 w-4" />
              {isExpanded && <span className="ml-2">New Course</span>}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-100 border border-gray-800">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter course details and upload a syllabus.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input 
                placeholder="Class Name" 
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                className="bg-gray-800 border-gray-700" 
              />
              <Input 
                placeholder="Instructor" 
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                className="bg-gray-800 border-gray-700" 
              />
              <Input 
                type="file" 
                accept=".pdf"
                onChange={(e) => setNewCourse({...newCourse, pdf: e.target.files[0]})}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <Button onClick={handleAddCourse} disabled={!isFormValid}>Add Course</Button>
          </DialogContent>
        </Dialog>
        {courses.map((course, index) => (
          <Button key={index} variant="ghost" className="justify-start mb-2" onClick={() => setActiveCourse(index)}>
            <ChevronRight className="mr-2 h-4 w-4" />
            {isExpanded && <span className="truncate">{course.name}</span>}
          </Button>
        ))}
        <div className="flex-grow"></div>
        <Button variant="ghost" className="justify-center" onClick={() => setShowSettings(true)}>
          <Settings className="h-4 w-4" />
          {isExpanded && <span className="ml-2">Settings</span>}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeCourse !== null ? (
          <CourseView 
            course={courses[activeCourse]} 
            onClose={() => setActiveCourse(null)} 
            onDelete={() => handleDeleteCourse(activeCourse)}
          />
        ) : showSettings ? (
          <SettingsView onClose={() => setShowSettings(false)} />
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
                  placeholder="Ask v0 a question..."
                  className="flex-grow bg-black border-none focus:ring-0"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="icon" className="bg-black hover:bg-gray-800">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {showAddPopup && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg">
                  <Button onClick={() => {
                    setShowAddPopup(false)
                    // Logic to add to events or reminders
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
    </div>
  )
}