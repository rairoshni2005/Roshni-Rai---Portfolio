import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Zap, Wind, Radio } from 'lucide-react';

const SoundMixer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVibe, setActiveVibe] = useState('stealth');

  const vibes = [
    { id: 'stealth', name: 'Stealth', icon: <Zap size={14} />, desc: 'Deep pulses for focused browsing.' },
    { id: 'orchestral', name: 'Majesty', icon: <Wind size={14} />, desc: 'Epic orchestral layers for impact.' },
    { id: 'lofi', name: 'Ethereal', icon: <Radio size={14} />, desc: 'Minimalist lofi for a chill journey.' }
  ];

  const handleVibeChange = (vibe) => {
    setActiveVibe(vibe);
    window.dispatchEvent(new CustomEvent('change-vibe', { detail: { vibe } }));
    window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'VIBE_SHIFTED' } }));
  };

  return (
    <div className="fixed top-8 right-40 z-[100000] pointer-events-none md:right-48">
      <div className="flex items-center gap-3 justify-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="pointer-events-auto flex gap-2 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
            >
              {vibes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVibeChange(v.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-500 ${
                    activeVibe === v.id 
                      ? 'bg-[var(--color-accent)] text-white shadow-[0_0_15px_var(--color-accent)]' 
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  {v.icon}
                  <span className="text-[9px] uppercase font-bold tracking-widest">{v.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          className="pointer-events-auto w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-[var(--color-accent-light)] hover:border-[var(--color-accent-light)] transition-all group"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <Music size={18} />
          {/* Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-accent)] rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default SoundMixer;
