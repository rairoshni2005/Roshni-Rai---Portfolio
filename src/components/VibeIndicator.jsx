import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VibeIndicator = () => {
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState("Refining Pixels");
  const [section, setSection] = useState('home');

  const statuses = [
    "Refining Pixels",
    "Searching for Bugs",
    "Caffeinating...",
    "Designing Dreams",
    "Polishing Micro-interactions",
    "Writing Clean Code",
    "Iterating on UX",
    "Thinking in Motion"
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const statusTimer = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'work', 'projects', 'education', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setSection(id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getShape = () => {
    switch(section) {
      case 'home': return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"; // Diamond
      case 'about': return "circle(50% at 50% 50%)"; // Sphere
      case 'skills': return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // Cube
      case 'projects': return "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"; // Star
      default: return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    }
  };

  return (
    <motion.div 
      className="fixed bottom-8 left-8 z-[5000] hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full overflow-hidden cursor-help group/vibe"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="w-4 h-4 bg-[var(--color-accent-light)]"
          animate={{ 
            clipPath: getShape(),
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ 
            clipPath: { duration: 1, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Live</span>
      </div>

      <div className="w-[1px] h-3 bg-white/10"></div>

      {/* Discovery Hint on Hover */}
      <div className="relative overflow-hidden h-4 flex flex-col items-start min-w-[60px]">
        <div className="transition-transform duration-500 group-hover/vibe:-translate-y-4">
           {/* Time Display */}
           <div className="text-[10px] uppercase tracking-widest font-bold text-white/80 h-4 flex items-center">
             {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
           {/* Hint Display */}
           <div className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-accent)] h-4 flex items-center whitespace-nowrap">
             Press ⌘K
           </div>
        </div>
      </div>

      <div className="w-[1px] h-3 bg-white/10"></div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={status}
          className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-accent-light)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {status}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default VibeIndicator;
