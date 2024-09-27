import {  useState } from 'react';
import {  FiCalendar, FiMessageSquare, FiClock, FiPlus, FiUser } from 'react-icons/fi'
import CourseCard from './CourseCard'
import AddEditCourseModal from './CourseCardModal';


///const course = [{ id: 1, name: 'Introduction to Computer Science', instructor: 'Dr. Smith', nextDeadline: 'Oct 15, 2:00 PM', syllabusUploaded: true },
///{ id: 2, name: 'Data Structures', instructor: 'Prof. Johnson', nextDeadline: 'Oct 20, 11:59 PM', syllabusUploaded: false },
///{ id: 3, name: 'Artificial Intelligence', instructor: 'Dr. Lee', nextDeadline: 'Oct 18, 3:00 PM', syllabusUploaded: true },]

export default function DashboardTemp() {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('')
    const [courses, setCourses] = useState([
    
  ])

    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)

    const handleAddEditCourse = (course) => {
      if (course.id) {
        setCourses(courses.map(c => c.id === course.id ? course : c))
      } else {
        setCourses([...courses, { ...course, id: courses.length + 1 }])
      }
      setIsAddEditModalOpen(false)
      setEditingCourse(null)
    }
  
    const handleEditCourse = (course) => {
      setEditingCourse(course)
      setIsAddEditModalOpen(true)
    }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, isUser: true }])
      setInputMessage('')
      // Here you would typically send the message to your AI agent and get a response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "I'm processing your request. How can I assist you with your syllabus?", isUser: false }])
      }, 1000)
    }
  }

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#00df9a] mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Cards Section */}
          <div className="md:col-span-1 grid gap-4">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                courseName={course.name}
                instructor={course.instructor}
                nextDeadline={course.nextDeadline}
                syllabusUploaded={course.syllabusUploaded}
              />
            ))}
            <button onClick = {() => setIsAddEditModalOpen(true)}className="bg-gray-800 p-6 rounded-lg shadow-lg text-[#00df9a] flex items-center justify-center hover:bg-gray-700 transition duration-300">
              <FiPlus className="mr-2" /> Add New Course
            </button>
          </div>

          {/* AI Chat Section */}
          <div className="  bg-gray-800 p-6 rounded-lg shadow-lg mx-auto w-full md:w-full md:h-full md:col-span-2 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiMessageSquare className="mr-2" /> AI Assistant
            </h2>
            <div className="md:h-64 overflow-y-auto mb-4 bg-gray-700 p-4 rounded-lg sm:h-64 ">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-[#00df9a] text-gray-800' : 'bg-gray-600'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex ">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
                placeholder="Ask about your syllabus..."
              />
              <button
                type="submit"
                className="bg-[#00df9a] text-gray-800 px-4 py-2 rounded-r-lg hover:bg-[#00df9a]/90 transition duration-300"
              >
                Send
              </button>
            </form>
          </div>

          {/* Syllabus Upload Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiUser className="mr-2" /> User Profile
            </h2>
            <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-[#00df9a] rounded-lg shadow-lg tracking-wide uppercase border border-[#00df9a] cursor-pointer hover:bg-[#00df9a] hover:text-gray-800 transition duration-300">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Working...</span>
            </label>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiClock className="mr-2" /> Upcoming Events
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiCalendar className="mr-2 text-[#00df9a]" />
                <span>Midterm Exam - Oct 15, 2:00 PM</span>
              </li>
              <li className="flex items-center">
                <FiCalendar className="mr-2 text-[#00df9a]" />
                <span>Project Deadline - Oct 20, 11:59 PM</span>
              </li>
              <li className="flex items-center">
                <FiCalendar className="mr-2 text-[#00df9a]" />
                <span>Office Hours - Every Tuesday, 3:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Google Calendar Integration Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiCalendar className="mr-2" /> Google Calendar Integration
            </h2>
            <p className="mb-4">Connect your Google Calendar to automatically add events from your syllabus.</p>
            <button className="bg-[#00df9a] text-gray-800 px-4 py-2 rounded-lg hover:bg-[#00df9a]/90 transition duration-300">
              Connect Google Calendar
            </button>
          </div>
        </div>
      </div>
      {isAddEditModalOpen && (
        <AddEditCourseModal
          course={editingCourse}
          onSave={handleAddEditCourse}
          onClose={() => {
            setIsAddEditModalOpen(false)
            setEditingCourse(null)
          }}
        />
      )}
    </div>
  )
}