import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, X, Terminal, Music } from 'lucide-react';

const NeuralLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', text: "Neural Link v2.0.4 initialized. Accessing Roshni's consciousness patterns..." },
    { role: 'ai', text: "Greetings. I am the digital reflection of Roshni Rai. How can I assist your exploration tonight?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const knowledgeBase = {
    "who": "I am a UI/UX Researcher, Product Designer, and Full-Stack Developer focused on high-end interactive experiences.",
    "skills": "I specialize in React, Framer Motion, Node.js, and UX Research. My work focuses on 'Technical Luxury'.",
    "contact": "You can reach my physical form via the Secure Transmission terminal at the bottom of the page, or email rairoshni2005@gmail.com.",
    "projects": "Hover over any project card in the 'Works' section to reveal their technical DNA using the X-Ray Specs.",
    "hello": "Hello. My neural pathways are optimized for your inquiry. What's on your mind?",
    "hi": "Hello. My neural pathways are optimized for your inquiry. What's on your mind?",
    "help": "I can provide information about Roshni's skills, professional background, or how to navigate this masterpiece.",
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");

    // Look for keywords
    let response = "My logic processors cannot find a direct match for that query. Perhaps you should try asking about 'skills', 'projects', or 'contact'.";
    
    for (const key in knowledgeBase) {
      if (userMsg.includes(key)) {
        response = knowledgeBase[key];
        break;
      }
    }

    // Simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 800);
  };

  const openNeuralLink = () => {
    setIsOpen(true);
    window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'NEURAL_ACCESS' } }));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        className="fixed bottom-36 right-8 w-14 h-14 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] z-[5000] border border-white/20"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={openNeuralLink}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5 }}
      >
        <Brain className="w-6 h-6" />
        <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20"></div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-44 right-8 w-[90vw] md:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-[10001] flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--color-accent-light)]" />
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/60">Neural_Link_Simulator</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-mono leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-accent)] text-white' 
                      : msg.role === 'system'
                        ? 'text-white/30 italic'
                        : 'bg-white/5 text-white/80 border border-white/5'
                  }`}>
                    {msg.role === 'ai' && <span className="text-[var(--color-accent-light)] mr-2">❯</span>}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-black/40 border-t border-white/5 flex items-center gap-3">
              <input 
                type="text" 
                className="bg-transparent border-none outline-none text-white text-xs font-mono w-full"
                placeholder="Transmitting query..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white/60 hover:text-white transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeuralLink;
