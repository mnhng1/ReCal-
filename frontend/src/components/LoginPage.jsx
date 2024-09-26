import  { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8000/accounts/oauth/google/login/';
}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.message === "Login successful") {
            window.location.href = 'http://localhost:5173/dashboard'
        }
        console.log(data)
    } catch (e) {
        console.log(e);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-2">Hello & Welcome.</h2>
        <p className="text-center text-gray-400 mb-6">Create or sign in to your account to continue</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
              placeholder="use@123"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
              required
              placeholder='*****'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00df9a] text-black font-medium py-2 px-4 rounded-md hover:bg-[#00df9a]/90 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="create" className="text-sm text-[#00df9a] hover:underline">
            Create Account
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-[#00df9a] hover:underline">
            Forgot your password?
          </a>
          
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>
          <button 
            onClick={ handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Google
          </button>
        </div>
      </div>
    </div>
  )
}