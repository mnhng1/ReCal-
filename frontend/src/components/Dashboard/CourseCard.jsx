
import { FiBook, FiClock } from "react-icons/fi"
import PropTypes from "prop-types";

const CourseCard = ({
  courseName,
  instructor,
  nextDeadline,
  syllabusUploaded
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2 text-[#00df9a] flex items-center">
        <FiBook className="mr-2" /> {courseName}
      </h3>
      <p className="text-gray-300 mb-2">Instructor: {instructor}</p>
      <div className="flex items-center text-gray-400 mb-2">
        <FiClock className="mr-2" />
        <span>Next Deadline: {nextDeadline}</span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-2 py-1 rounded ${
            syllabusUploaded
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-gray-800"
          }`}
        >
          {syllabusUploaded ? "Syllabus Uploaded" : "Upload Syllabus"}
        </span>
        <button className="bg-[#00df9a] text-gray-800 px-3 py-1 rounded hover:bg-[#00df9a]/90 transition duration-300">
          View Details
        </button>
      </div>
    </div>
  )
}

CourseCard.propTypes = {
    courseName: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    nextDeadline: PropTypes.string.isRequired,
    syllabusUploaded: PropTypes.bool.isRequired
  };

export default CourseCard