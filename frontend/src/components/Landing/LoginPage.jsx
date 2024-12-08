
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    if (credential) {
      try {
        
        const res = await axios.post('http://localhost:8000/google-login/', 
          { token: credential },
        );
        const { access, refresh } = res.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        navigate('/dashboard');
      } catch (err) {
        console.error('Authentication failed:', err.response ? err.response.data : err.message);
      }
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In failed:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-black  rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-2">Hello & Welcome.</h2>
        <p className="text-center text-gray-400 mb-6">Sign in to your account to continue</p>
        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-300"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Continue with Google
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};


export default LoginPage;