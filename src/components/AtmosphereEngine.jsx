import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    id: 'cyber',
    name: 'Cyber Indigo',
    primary: '#6366f1',
    light: '#818cf8',
    rgb: '99, 102, 241'
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    primary: '#0F52BA',
    light: '#4169E1',
    rgb: '15, 82, 186'
  },
  {
    id: 'gold',
    name: 'Liquid Gold',
    primary: '#D4AF37',
    light: '#F3E5AB',
    rgb: '212, 175, 55'
  },
  {
    id: 'ruby',
    name: 'Blood Moon Ruby',
    primary: '#8B0000',
    light: '#DC143C',
    rgb: '139, 0, 0'
  }
];

const AtmosphereEngine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('roshni_atmosphere');
    if (savedThemeId) {
      const found = themes.find(t => t.id === savedThemeId);
      if (found) {
        applyTheme(found);
      }
    }
  }, []);

  const applyTheme = (theme) => {
    setActiveTheme(theme);
    localStorage.setItem('roshni_atmosphere', theme.id);
    
    // Inject CSS variables globally onto :root
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.primary);
    root.style.setProperty('--theme-accent-light', theme.light);
    root.style.setProperty('--color-accent-rgb', theme.rgb);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 mix-blend-difference flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 py-3 px-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 shadow-xl"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme)}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-300 hover:scale-125 focus:outline-none ${activeTheme.id === theme.id ? 'scale-125 border-white' : 'border-transparent'}`}
                style={{ backgroundColor: theme.primary, boxShadow: `0 0 15px rgba(${theme.rgb}, 0.5)` }}
                title={theme.name}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all duration-300 group"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white group-hover:rotate-180 transition-transform duration-700"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </button>
    </div>
  );
};

export default AtmosphereEngine;
