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
