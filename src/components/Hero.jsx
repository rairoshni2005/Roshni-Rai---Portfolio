import React, { useState, useEffect } from 'react';
import Section from './Section';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MousePointer2, Lock, Unlock } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  // Magnetic/Interactive Background Blob
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // --- Intervention Logic ---
  const [dragCount, setDragCount] = useState(0);
  const [isRoshniFixing, setIsRoshniFixing] = useState(false);
  const [roshniMessage, setRoshniMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for the heading position
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  const headXSpring = useSpring(headX, { damping: 30, stiffness: 200 });
  const headYSpring = useSpring(headY, { damping: 30, stiffness: 200 });

  const messages = [
    "Let's keep this centered, please.",
    "Bruhhh, stop disturbing my layout!",
    "Again? We just fixed this...",
    "I'm losing my layers! (just kidding)",
    "Okay, seriously? Center it stays.",
    "Do you even know how long this took to align?"
  ];

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragCount(prev => prev + 1);

    // Auto-return logic
    setTimeout(() => {
      if (!isRoshniFixing) {
        headX.set(0);
        headY.set(0);
      }
    }, 100);
  };

  useEffect(() => {
    // Trigger Roshni's intervention after EVERY drag
    if (dragCount > 0 && !isRoshniFixing) {
      triggerIntervention();
      if (dragCount >= 2) {
        window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'HERO_DISTURBED' } }));
      }
    }
  }, [dragCount]);

  const triggerIntervention = async () => {
    setIsRoshniFixing(true);
    // Picks messages sequentially based on drag count
    const msg = messages[(dragCount - 1) % messages.length];
    setRoshniMessage(msg);

    // Wait for cursor to "arrive" at the heading
    setTimeout(() => {
      headX.set(0);
      headY.set(0);

      // Wait for "fixing" animation to finish, then hide cursor
      setTimeout(() => {
        setIsRoshniFixing(false);
      }, 1500);
    }, 800);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const [pulse, setPulse] = useState(0);
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    const handlePulse = (e) => setPulse(e.detail.volume);
    window.addEventListener('audio-pulse', handlePulse);

    const interval = setInterval(() => {
      setAutoIndex(prev => prev + 1);
    }, 3000); // Rotate every 3s

    return () => {
      window.removeEventListener('audio-pulse', handlePulse);
      clearInterval(interval);
    };
  }, []);

  const currentRoleIndex = (dragCount + autoIndex) % 3;

  return (
    <Section
      id="home"
      theme="dark"
      className="h-screen items-center justify-center text-center overflow-hidden flex flex-col relative bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      {/* Premium Background Elements */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#111] to-transparent pointer-events-none z-0"></div>

      {/* Interactive Aura Blob (Audio Reactive) */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-accent)] filter blur-[150px] mix-blend-screen -z-10"
        animate={{
          scale: 1 + pulse * 2,
          opacity: 0.05 + pulse * 0.2
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      {/* Fake Cursor (Roshni) */}
      <AnimatePresence>
        {isRoshniFixing && (
          <motion.div
            className="fixed z-[100] pointer-events-none"
            initial={{ x: "100vw", y: "100vh" }}
            animate={{
              x: window.innerWidth / 2 + headX.get() + 80,
              y: window.innerHeight / 2 + headY.get() + 80
            }}
            exit={{ x: "-20vw", y: "-20vh" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <div className="relative">
              <MousePointer2 className="text-[var(--color-accent-light)] fill-[var(--color-accent)]" size={32} />
              <div className="absolute top-8 left-4 bg-[var(--color-accent)] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                Roshni Rai
              </div>
              <motion.div
                className="absolute -top-16 -left-20 bg-white text-black px-4 py-2 rounded-2xl rounded-bl-none text-sm font-medium shadow-2xl whitespace-nowrap min-w-[150px]"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {roshniMessage}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ y: y1, opacity: opacity1 }} className="relative z-10 w-full px-4">
        {/* DRAG TO MOVE INDICATOR */}
        <div className="flex flex-col items-center mb-6">
          <AnimatePresence>
            {!isDragging && !isRoshniFixing && (
              <motion.div
                className="bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-2 rounded shadow-sm flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                Drag to move
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex justify-center items-center gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-12 bg-gray-700"></div>
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Portfolio 2024</span>
            <div className="h-[1px] w-12 bg-gray-700"></div>
          </motion.div>
        </div>

        <div className="relative inline-block group">
          {/* Main Content (Visual) */}
          <motion.h1 
            className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter mb-4 text-white leading-none cursor-grab active:cursor-grabbing select-none relative z-10"
            style={{ x: headXSpring, y: headYSpring }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Roshni<span className="font-serif italic font-light ml-4 md:ml-8 text-[var(--color-accent-light)] group-hover:text-white transition-all duration-700 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Rai</span>
          </motion.h1>

          {/* Visual Container Box on Hover/Drag */}
          <motion.div 
            className="absolute -inset-8 border border-white/10 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ x: headXSpring, y: headYSpring }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>
          </motion.div>
        </div>
        
        <div className="h-10 md:h-12 flex justify-center items-center relative">
          <AnimatePresence mode="wait">
             <motion.p 
              key={currentRoleIndex} 
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-3xl text-white font-bold tracking-[0.2em] uppercase font-mono bg-white/5 px-6 py-2 rounded-full border border-white/10"
            >
              {[
                "UI/UX Researcher",
                "Product Designer",
                "Full-Stack Engineer"
              ][currentRoleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block" data-magnetic>
            <button
              onClick={handleScrollToProjects}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-medium text-white transition-all duration-300 overflow-hidden bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 backdrop-blur-md w-full md:w-auto"
            >
              <span className="relative z-10 tracking-[0.2em] uppercase text-xs font-bold">View Projects</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[#4B0082] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block" data-magnetic>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-decryption'))}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-medium text-black transition-all duration-300 overflow-hidden bg-white border border-white rounded-full hover:bg-[var(--color-accent-light)] hover:border-white w-full md:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase text-xs font-bold">
                <Lock size={14} className="group-hover:hidden" />
                <Unlock size={14} className="hidden group-hover:block" />
                Access CV
              </div>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <div className="w-[1px] h-12 bg-gray-800 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 bg-white"
            variants={{
              start: { y: "-100%" },
              end: { y: "200%" }
            }}
            initial="start"
            animate="end"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Hero;
