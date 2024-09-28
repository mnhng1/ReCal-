import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

export default function SettingsView({ onClose }) {
  const [username, setUsername] = useState('')

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...')
  }

  const handleConnectGoogle = () => {
    // Implement Google connection logic here
    console.log('Connecting with Google...')
  }

  return (
    <div className="flex flex-col h-full p-4 bg-black text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <Button onClick={handleLogout} variant="outline" className="w-full">Log Out</Button>
        <Button onClick={handleConnectGoogle} variant="outline" className="w-full">Connect with Google</Button>
      </div>
    </div>
  )
}