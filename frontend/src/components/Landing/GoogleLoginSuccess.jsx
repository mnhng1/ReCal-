import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Assuming you're using React Router

const GoogleLoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');  // Extract the JWT token

    if (token) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('jwt_token', token);

      // Optionally, redirect the user to the dashboard or another page
      navigate('/dashboard');
    } else {
      // Handle the case where no token is present
      console.error('Token not found in the URL');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Processing login...</h1>
    </div>
  );
};

export default GoogleLoginSuccess;