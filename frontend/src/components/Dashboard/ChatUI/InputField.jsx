import {useState} from 'react'

const InputField = ({onSend}) => { 
    const [input, setInput] = useState('')


    const handleSend = () => {
        if (input.trim()) {
            onSend(input)
            setInput('')
        }
    }

    const handleKeyPress = (e) => { 
        if (e.key === 'Enter') { 
            handleSend()
        }
    }
    return (
        <div className="p-4 bg-gray-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={handleKeyPress}
            placeholder="Type your message..."
            className="w-full p-2 border rounded-md"
          />
          <button onClick={handleSend} className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md">
            Send
          </button>
        </div>
      );

}

export default InputField