import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-6">Sign in to your account to continue</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00df9a] focus:border-transparent"
              placeholder="m@example.com"
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