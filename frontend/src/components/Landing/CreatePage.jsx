import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function CreateAccountPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred during registration');
      }

      if (data.message === "User created successfully") {
        setSuccess('Account created successfully! You can now log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Unexpected response from server');
      }
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-2">Create an Account</h2>
        <p className="text-center text-gray-400 mb-6">Sign up to get started</p>
        <form onSubmit={handleCreateAccount} className="space-y-4">
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
              placeholder="Choose a username"
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
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-[#00df9a] text-black font-medium py-2 px-4 rounded-md hover:bg-[#00df9a]/90 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-[#00df9a] hover:underline">
            Already have an account? Sign in
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