import { useState } from 'react';
import axios from "axios";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState([{
      role: "model",
      parts: [{ text: "what's on your mind ..." }]
    }]);
    const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState(["what's on your mind ... "]);

  const handleKeys = (e) => {
    if (e.key === "Enter" && prompt !== "") {
      setChatHistory([...chatHistory, prompt]);
      setPrompt("");
      handleEnter();
    }
  };

  const handleEnter = async () => {
    const userPrompt = {
      role: "user",
      parts: [{ text: prompt }]
    };

    let updatedContext = [...context, userPrompt];
    setContext(updatedContext);
    setLoading((prev)=>!prev);
    const res = await axios.post("http://localhost:4000/chatbot/v2/chatRoute", { context: updatedContext });
    setLoading((prev)=>!prev);
    const botResponse = {
      role: "model",
      parts: [{ text: res.data.data.response }]
    };

    updatedContext = [...context, botResponse];
    setContext(updatedContext);
    setChatHistory((prev) => [...prev, res.data.data.response]);
  };

  return (
    <main className=" w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center justify-center font-sans p-5">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-300 mb-8 ">
        404 Not a Human
      </h1>

      <section className="w-full md:w-2/3 h-[440px] flex flex-col justify-between bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-white/20">
        <section
          className="p-6 overflow-auto flex flex-col gap-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            section::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {context && (
            chatHistory.map((elem, idx) => (
              <div
                key={idx}
                className={`px-5 py-3 max-w-xs md:max-w-sm rounded-2xl text-sm ${
                  idx % 2 === 0
                    ? 'self-start bg-white/20 text-white shadow-lg'
                    : 'self-end bg-white/10 text-white shadow-lg'
                } hover:scale-105 transition-transform`}
              >
                {
                elem
                }
              </div>
              
            ))
          )}
          {
                loading && (
                  <div className='flex gap-1'>
                    <div className='bg-white rounded-full h-2 w-2 animate-pulse '/>
                    <div className='bg-white rounded-full h-2 w-2 animate-pulse '/>
                    <div className='bg-white rounded-full h-2 w-2 animate-pulse '/>
                  </div>
                )
              }
        </section>

        <div className="flex justify-center items-center p-4">
          <input
            className="outline-none border-none bg-white/10 text-white placeholder:text-gray-300 rounded-full w-4/5 mx-auto px-4 py-3 text-sm shadow-inner focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeys}
          />
        </div>
      </section>
    </main>
  );
};

export default App;
