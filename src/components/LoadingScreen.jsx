import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("Initializing");

  useEffect(() => {
    let start = 0;
    const end = 1000;
    const duration = 2500; // 2.5 seconds
    const increment = end / (duration / 16); // ~16ms for 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(1000);
        clearInterval(timer);
        setTimeout(() => {
          window.scrollTo(0, 0);
          onComplete();
        }, 800); 
      } else {
        setCount(Math.floor(start));
      }

      // Update Phase text
      if (start > 800) setPhase("Ready");
      else if (start > 500) setPhase("Optimizing Assets");
      else if (start > 200) setPhase("Architecting UX");
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Background Decorative Aura */}
      <motion.div 
        className="absolute w-[80vw] h-[80vw] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[150px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* The Phase Text */}
        <motion.div 
          className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={phase}
        >
          {phase}
        </motion.div>

        {/* The Big Number */}
        <div className="relative">
          <motion.h2 
            className="text-[12rem] md:text-[20rem] font-bold tracking-tighter text-white leading-none overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {count.toString().padStart(4, '0')}
          </motion.h2>
          
          {/* Scanning Line */}
          <motion.div 
            className="absolute inset-x-0 h-[2px] bg-[var(--color-accent-light)] z-20 shadow-[0_0_20px_var(--color-accent)]"
            animate={{ 
              top: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-[300px] h-[1px] bg-white/10 mt-12 relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${(count / 1000) * 100}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <motion.div 
          className="mt-8 flex gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Main Character Energy</span>
          <span className="text-[var(--color-accent)]">Roshni Rai</span>
          <span>Definitely Not a Template</span>
        </motion.div>
      </div>

      {/* Decorative Corner Borders */}
      <div className="absolute top-12 left-12 w-20 h-20 border-t border-l border-white/20"></div>
      <div className="absolute top-12 right-12 w-20 h-20 border-t border-r border-white/20"></div>
      <div className="absolute bottom-12 left-12 w-20 h-20 border-b border-l border-white/20"></div>
      <div className="absolute bottom-12 right-12 w-20 h-20 border-b border-r border-white/20"></div>
    </motion.div>
  );
};

export default LoadingScreen;
