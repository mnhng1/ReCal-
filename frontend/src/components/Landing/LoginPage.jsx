import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-2">Hello & Welcome.</h2>
        <p className="text-center text-gray-400 mb-6">Sign in to your account to continue</p>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Continue with</span>
            </div>
          </div>
          <button 
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
}