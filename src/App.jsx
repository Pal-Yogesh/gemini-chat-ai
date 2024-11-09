import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... This may take a few seconds.");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error,"error");
      setAnswer("Sorry, something went wrong. Please try again.");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1a1a1a] to-[#000000] flex items-center justify-center p-6">
      <div className="bg-[#1a1a1a] w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white">Chat AI</h1>
          <p className="text-white mt-2">
            Ask me anything and get instant responses!
          </p>
        </header>

        <form onSubmit={generateAnswer} className="space-y-4">
          <textarea
            required
            className="w-full p-4 text-white bg-transparent border  rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] transition duration-200"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows="4"
          ></textarea>
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-medium ${
              generatingAnswer
                ? "bg-neutral-800 cursor-not-allowed"
                : "bg-neutral-800 hover:bg-gray-800"
            } transition duration-300`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating Answer..." : "Generate Answer"}
          </button>
        </form>

        {answer && (
          <div className="bg-[#1a1a1a] p-4 rounded-md shadow-md border border-gray-200 overflow-auto max-h-64">
            <ReactMarkdown className="prose max-w-none text-white">
              {answer}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



// import { useState, useRef, useEffect } from "react";
// import "./App.css";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

// function App() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);

//   const chatContainerRef = useRef(null);
//   console.log(answer);
  

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory, generatingAnswer]);

//   async function generateAnswer(e) {
//     e.preventDefault();
//     if (!question.trim()) return;
    
//     setGeneratingAnswer(true);
//     const currentQuestion = question;
//     setQuestion(""); // Clear input immediately after sending
    
//     // Add user question to chat history
//     setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
    
//     try {
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
//           import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
//         }`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: question }] }],
//         },
//       });

//       const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
//       setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
//       setAnswer(aiResponse);
//     } catch (error) {
//       console.log(error);
//       setAnswer("Sorry - Something went wrong. Please try again!");
//     }
//     setGeneratingAnswer(false);
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-bl from-[#1a1a1a] to-[#000000]">
//       <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
       
//         <header className="text-center py-4">
          
//             <h1 className="text-4xl font-bold text-white transition-colors">
//               Chat With Gemini
//             </h1>
        
//         </header>

        
//         <div 
//           ref={chatContainerRef}
//           className="flex-1 overflow-y-auto mb-4 rounded-2xl bg-[#1a1a1a] shadow-lg p-4 hide-scrollbar"
//         >
//           {chatHistory.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center p-6">
//               <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl">
//                 <h2 className="text-2xl font-bold text-white mb-4">Welcome to Gemini Chat</h2>
                
              
//               </div>
//             </div>
//           ) : (
//             <>
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
//                   <div className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
//                     chat.type === 'question' 
//                       ? 'bg-neutral-800 text-white rounded-br-none'
//                       : 'bg-neutral-800 text-white rounded-bl-none'
//                   }`}>
//                     <ReactMarkdown className="overflow-auto hide-scrollbar">{chat.content}</ReactMarkdown>
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//           {generatingAnswer && (
//             <div className="text-left">
//               <div className="inline-block bg-[#1a1a1a] text-white p-3 rounded-lg animate-pulse">
//                 Pleate Wait it make take few seconds...
//               </div>
//             </div>
//           )}
//         </div>

       
//         <form onSubmit={generateAnswer} className="bg-[#1a1a1a] rounded-2xl shadow-lg p-3 ">
//           <div className="flex gap-2">
//             <textarea
//               required
//               className="flex-1 border border-[#1a1a1a] overflow-auto hide-scrollbar p-2 resize-none focus:outline-none bg-[#1a1a1a] text-white"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               placeholder="Message Gemini..."
//               rows="1"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                   e.preventDefault();
//                   generateAnswer(e);
//                 }
//               }}
//             ></textarea>
//             <button
//               type="submit"
//               className={`px-6 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-2xl  transition-colors ${
//                 generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={generatingAnswer}
//             >
//               Send
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
