import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const WarpDrive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWarp = () => {
    setIsWarping(true);
    
    // Smooth hyperspace jump
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => setIsWarping(false), 800);
    }, 400);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !isWarping && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={handleWarp}
            className="fixed bottom-10 right-8 z-[500000] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-transform group overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-[var(--color-accent)] transition-all duration-300 -z-0" />
            <Rocket size={20} className="relative z-10 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWarping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000000] bg-black pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Warp Speed Lines */}
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scaleY: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                animate={{ scaleY: 20, opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, ease: "circIn", repeat: Infinity, delay: Math.random() * 0.5 }}
                className="absolute w-[2px] h-20 bg-white/20 origin-top"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
            
            <motion.div 
               initial={{ scale: 1, filter: "blur(0px)" }}
               animate={{ scale: 1.5, filter: "blur(20px)" }}
               className="text-[var(--color-accent)] font-bold text-4xl uppercase tracking-[1em]"
            >
              Warping...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WarpDrive;
