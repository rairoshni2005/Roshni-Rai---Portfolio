import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sectionsList = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'projects', name: 'Projects' },
  { id: 'work', name: 'Experience' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' }
];

const ScrollOrbit = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('Home');

  // Map scroll progress to SVG stroke dash (r=40 implies circumference = 2 * pi * 40 ≈ 251.2)
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [251.2, 0]);

  useEffect(() => {
    const handleScroll = () => {
      let current = 'Home';
      for (const section of sectionsList) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above 40% of viewport height, it's considered active
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.name;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed left-8 bottom-[max(2rem,env(safe-area-inset-bottom))] z-[5000] hidden xl:flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/5 shadow-2xl">
        {/* SVG Circle Progress */}
        <svg className="absolute inset-0 w-full h-full rotate-[-90deg] overflow-visible">
          {/* Base Track */}
          <circle 
            cx="48" 
            cy="48" 
            r="40" 
            fill="transparent" 
            stroke="rgba(255, 255, 255, 0.03)" 
            strokeWidth="2" 
            className="translate-x-1 translate-y-1"
          />
          {/* Active Progress */}
          <motion.circle 
            cx="48" 
            cy="48" 
            r="40" 
            fill="transparent" 
            stroke="var(--color-accent-light)" 
            strokeWidth="2" 
            strokeDasharray="251.2" 
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="translate-x-1 translate-y-1"
          />
        </svg>

        {/* Rotating Circular Text Callout */}
        <div className="absolute w-[120%] h-[120%] animate-[spin_20s_linear_infinite] opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="orbit-text-path"
              d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
              fill="none"
            />
            <text className="text-[5.5px] font-mono fill-white tracking-[0.22em] uppercase">
              <textPath href="#orbit-text-path" startOffset="0%">
                Navigation Orbit // Active // Progress Status //
              </textPath>
            </text>
          </svg>
        </div>

        {/* Active Section Label */}
        <div className="flex flex-col items-center justify-center leading-none text-center">
          <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">Section</span>
          <motion.span 
            key={activeSection}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-bold font-mono text-white uppercase tracking-wider"
          >
            {activeSection}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollOrbit;
