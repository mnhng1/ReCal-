import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import PropTypes from "prop-types";

export default function CourseView({ course, onClose, onDelete }) {
  return (
    <div className="flex flex-col h-full p-4 bg-black text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{course.name}</h2>
        <div>
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="destructive" onClick={onDelete}>Delete Course</Button>
        </div>
      </div>
      <p className="mb-4">Instructor: {course.instructor}</p>
      <div className="flex-grow bg-gray-900 rounded-lg p-4 overflow-auto">
        {course.pdf ? (
          <iframe 
            src={URL.createObjectURL(course.pdf)} 
            className="w-full h-full"
            title={`${course.name} Syllabus`}
          />
        ) : (
          <p>No PDF uploaded for this course.</p>
        )}
      </div>
    </div>
  )
}
CourseView.propTypes = {
    course: PropTypes.string.isRequired,
    onSave: PropTypes.string.isRequired,
    onClose: PropTypes.string.isRequired,
    
  };
  