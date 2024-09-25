import  { useState, useEffect } from 'react'
import { FiX, FiUpload } from 'react-icons/fi'
import PropTypes from "prop-types";
const AddEditCourseModal = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    syllabusUploaded: false,
  })
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (course) {
      setFormData(course)
    }
  }, [course])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setFormData(prev => ({ ...prev, syllabusUploaded: true }))
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      try {
        const formData = new FormData();
        formData.append('title', file.name);
        formData.append('file', file);

        const response = await fetch('http://localhost:8000/api/syllabus/upload/', {
          method: 'POST',
          body: formData,
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('File successfully uploaded:', result);

        
      } catch (e) {
        console.log('Error uploading file:', e);
      }
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#00df9a]">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-[#00df9a] focus:border-[#00df9a]"
              required
            />
          </div>
          <div>
            <label htmlFor="instructor" className="block text-sm font-medium text-gray-300">Instructor</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-[#00df9a] focus:border-[#00df9a]"
              required
            />
          </div>
          <div>
            <label htmlFor="syllabus" className="block text-sm font-medium text-gray-300">Upload Syllabus (PDF)</label>
            <div className="mt-1 flex items-center">
              <label className="w-full flex items-center px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm border border-gray-600 cursor-pointer hover:bg-gray-600">
                <FiUpload className="mr-2" />
                <span>{file ? file.name : 'Select file'}</span>
                <input 
                  id="syllabus" 
                  name="syllabus" 
                  type="file" 
                  onChange={handleFileChange} 
                  className="sr-only" 
                  accept=".pdf"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00df9a] text-gray-800 rounded-md hover:bg-[#00df9a]/90 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


AddEditCourseModal.propTypes = {
  course: PropTypes.string.isRequired,
  onSave: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
  
};

export default AddEditCourseModal