import { useState } from 'react'
import customGetMessage from './Hooks/customGetMessage'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [chatOutput, setchatOutput] = useState('')
  async function handleSubmit(){
    const obj = {
        "sessionId" : 1,
        "Role" : "user",
        "Content" : input
    }
    setMessages([...messages, obj])
    const response = await customGetMessage(obj);
    const aiobj = {
        "sessionId" : 1,
        "Role" : "AI",
        "Content" : response.content
    }
    setMessages([...messages, aiobj])
    return response;
  }
  return (
    <>
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Hotel Booking Interface</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-800">
        <div className="flex flex-col space-y-4">
      {/* Chat Area */
        messages.map((message, index) => {
          
          if(message.Role === "AI"){
            return(
              <div key={index} className="flex items-start">
              <div className="bg-white p-4 rounded-lg shadow-md max-w-md">
              <p className="text-gray-800">{message.Content}</p>
              </div>
              </div>
            )
          }else{
            return(
              // {/* User Message */}
              <div key={index} className="flex items-end justify-end">
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-md">
                  <p>{message.Content}</p>
                </div>
              </div>
            )
          }
        })
          }
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800 p-4 ">
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 bg-gray-900 text-white rounded-lg p-2 mr-2 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={handleSubmit}>Send</button>
        </div>
      </div>
      </div>

    </>
  )
}

export default App
