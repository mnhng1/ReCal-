import  { useState } from 'react';
import { LangChain } from 'langchain';  // Import Langchain

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    
    const langChain = new LangChain({
     
    });

    // Process input and get response
    const chatResponse = await langChain.chat(input);
    setResponse(chatResponse);
  };

  return (
    <div>
      <h2>Chat with Google Calendar Bot</h2>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Ask something like 'Show my events for today' or 'Create an event for tomorrow at 3 PM'"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;