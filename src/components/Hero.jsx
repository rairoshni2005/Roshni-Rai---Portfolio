import React, { useState, useEffect } from 'react';
import Section from './Section';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MousePointer2, Lock, Unlock } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import ScrambleText from './ScrambleText';

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

    setTimeout(() => {
      if (!isRoshniFixing) {
        headX.set(0);
        headY.set(0);
      }
    }, 100);
  };

  useEffect(() => {
    if (dragCount > 0 && !isRoshniFixing) {
      triggerIntervention();
      if (dragCount >= 2) {
        window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'HERO_DISTURBED' } }));
      }
    }
  }, [dragCount]);

  const triggerIntervention = async () => {
    setIsRoshniFixing(true);
    const msg = messages[(dragCount - 1) % messages.length];
    setRoshniMessage(msg);

    setTimeout(() => {
      headX.set(0);
      headY.set(0);

      setTimeout(() => setIsRoshniFixing(false), 1500);
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
    const interval = setInterval(() => setAutoIndex(prev => prev + 1), 3000);
    return () => {
      window.removeEventListener('audio-pulse', handlePulse);
      clearInterval(interval);
    };
  }, []);

  const currentRoleIndex = (dragCount + autoIndex) % 3;

  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <Section
      id="home"
      theme="dark"
      className="min-h-[100dvh] min-h-screen h-auto sm:h-screen items-center justify-center text-center overflow-hidden flex flex-col relative py-24 sm:py-0"
      onMouseMove={handleMouseMove}
    >
      {/* Premium Background Elements */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#111] to-transparent pointer-events-none z-0"></div>

      {/* 3D Spline Glass Orb */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-[20%] lg:-translate-x-[10%] -translate-y-1/2 w-[min(100vw,420px)] h-[min(100vw,420px)] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] z-0 opacity-70 sm:opacity-80 transition-opacity duration-1000 pointer-events-auto"
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)', 
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)' 
        }}
      >
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.8 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="w-full h-full"
         >
           <Spline 
             scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
             onLoad={() => setSplineLoaded(true)}
             style={{ cursor: 'grab' }}
           />
         </motion.div>
      </div>

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

      <motion.div style={{ y: y1, opacity: opacity1 }} className="relative z-10 w-full px-3 sm:px-4 pointer-events-none max-w-[100vw]">
        
        {/* DRAG TO MOVE INDICATOR */}
        <div className="flex flex-col items-center mb-6">
          <AnimatePresence>
            {!isDragging && !isRoshniFixing && (
              <motion.div
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 mb-3 rounded-full shadow-sm flex items-center gap-2 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <ScrambleText text="Drag to move" delay={1.5} duration={1000} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex justify-center items-center gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-xs tracking-[0.3em] uppercase text-white/50 font-mono">
               <ScrambleText text="Portfolio 2026" delay={0.5} duration={1200} />
            </span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </motion.div>
        </div>

        <div className="relative inline-block group pointer-events-auto">
          {/* Main Content (Visual) */}
          <motion.h1 
            className="text-[clamp(2.75rem,12vw,7rem)] sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter mb-4 text-white leading-none cursor-grab active:cursor-grabbing select-none relative z-20 drop-shadow-2xl"
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
            <ScrambleText text="Roshni" delay={0.2} duration={1500} />
            <span className="font-serif italic font-light ml-4 md:ml-8 text-[var(--color-accent-light)] group-hover:text-white transition-all duration-700 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
               <ScrambleText text="Rai" delay={0.6} duration={1500} />
            </span>
          </motion.h1>
        </div>
        
        <div className="h-10 md:h-12 flex justify-center items-center relative mt-2 pointer-events-auto">
          <AnimatePresence mode="wait">
             <motion.p 
              key={currentRoleIndex} 
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="text-sm sm:text-lg md:text-2xl text-white/90 font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono bg-[#0a0a0a]/80 backdrop-blur-xl px-4 py-2.5 sm:px-8 sm:py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] max-w-[95vw]"
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
          className="mt-16 flex flex-col md:flex-row gap-6 justify-center pointer-events-auto"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block" data-magnetic>
            <button
              onClick={handleScrollToProjects}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-medium text-white transition-all duration-300 overflow-hidden bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[var(--color-accent-light)] backdrop-blur-lg w-full md:w-auto shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.2)]"
            >
              <span className="relative z-10 tracking-[0.2em] uppercase text-xs font-bold font-mono">View Projects</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[#4B0082] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block" data-magnetic>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-decryption'))}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-base font-medium text-black transition-all duration-300 overflow-hidden bg-white border border-transparent rounded-full hover:bg-[var(--color-accent-light)] w-full md:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(var(--color-accent-light-rgb),0.5)]"
            >
              <div className="relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase text-xs font-bold font-mono">
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
        className="absolute bottom-[6.5rem] sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative rounded-full">
          <motion.div
            className="w-full h-1/2 bg-[var(--color-accent-light)] rounded-full shadow-[0_0_10px_var(--color-accent-light)]"
            variants={{
              start: { y: "-100%" },
              end: { y: "200%" }
            }}
            initial="start"
            animate="end"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Hero;
