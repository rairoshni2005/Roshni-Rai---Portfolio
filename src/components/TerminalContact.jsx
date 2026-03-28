import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalContact = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Name, 2: Message, 3: Sending, 4: Success
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: 'system', text: "Initializing secure communication channel..." },
    { type: 'system', text: "Connection established with Roshni's Private Console." },
    { type: 'system', text: "Please identify yourself. [ENTER NAME]" }
  ]);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const val = input.trim();
      if (!val) return;

      if (step === 0 || step === 1) {
        setHistory(prev => [...prev, { type: 'user', text: val }]);
        setFormData(prev => ({ ...prev, name: val }));
        setHistory(prev => [...prev, { type: 'system', text: `Welcome, ${val}. What is your message for the system?` }]);
        setStep(2);
        setInput("");
      } else if (step === 2) {
        setHistory(prev => [...prev, { type: 'user', text: val }]);
        const updatedData = { ...formData, message: val };
        setFormData(updatedData);
        setHistory(prev => [...prev, { type: 'system', text: "Transmitting data packets to Roshni..." }]);
        setStep(3);
        setInput("");
        
        // Real Submission via FormSubmit.co
        try {
          fetch("https://formsubmit.co/ajax/rairoshni2005@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              name: updatedData.name,
              message: updatedData.message,
              _subject: "New Message from Portfolio Terminal"
            })
          });
        } catch (err) { console.error(err); }

        // Simulate sending animation
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'system', text: "[SUCCESS] Message encrypted and sent. Roshni will reach out shortly." }]);
          setStep(4);
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Secure_Comms_v4.2.0</span>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-64 md:h-80 overflow-y-auto p-6 md:p-10 font-mono text-[11px] md:text-sm space-y-4 scrollbar-hide"
      >
        {history.map((line, i) => (
          <div key={i} className={`flex gap-4 ${line.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {line.type === 'system' && <span className="text-[var(--color-accent-light)] shrink-0">❯</span>}
            <span className={line.type === 'user' ? 'text-[var(--color-accent)]' : 'text-gray-400 font-light'}>
              {line.text}
            </span>
          </div>
        ))}

        {step < 3 && (
          <div className="flex gap-4 items-center animate-pulse">
            <span className="text-[var(--color-accent-light)]">❯</span>
            <input 
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-700"
              placeholder="_"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
            />
          </div>
        )}
      </div>

      <div className="bg-white/[0.02] px-10 py-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-700 font-bold">Status: Online</span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-700 font-bold">Port: 8080</span>
         </div>
         <div className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-[var(--color-accent)] opacity-40">End to End Encrypted</div>
      </div>
    </div>
  );
};

export default TerminalContact;
