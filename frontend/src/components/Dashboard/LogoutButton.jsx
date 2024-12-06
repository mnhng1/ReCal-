import { useNavigate } from "react-router-dom";
import axios from 'axios';
const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
          await axios.post('http://localhost:8000/logout/', { refresh: refreshToken }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      };

    return (
        <button onClick={handleLogout} className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-300">
            Logout
        </button>
    );
}

export default LogoutButton