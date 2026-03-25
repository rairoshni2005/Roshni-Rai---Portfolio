import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SidebarHUD = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const interval = setInterval(() => {
      setRuntime(prev => prev + 1);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[5000] hidden lg:flex flex-col items-center gap-12 pointer-events-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3 }}
    >
      <div className="rotate-90 flex items-center gap-4 whitespace-nowrap origin-center">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">System_Runtime_</span>
        <span className="text-[10px] font-mono text-[var(--color-accent-light)] font-bold tabular-nums">
          {formatTime(runtime)}
        </span>
      </div>

      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      <div className="rotate-90 flex items-center gap-6 whitespace-nowrap origin-center">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/20 uppercase">Lat_X</span>
            <span className="text-[10px] font-mono text-white/60 tabular-nums">{coords.x.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-white/20 uppercase">Lon_Y</span>
            <span className="text-[10px] font-mono text-white/60 tabular-nums">{coords.y.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      <div className="rotate-90 flex items-center gap-2 whitespace-nowrap origin-center">
        <span className="text-[10px] font-mono text-[var(--color-accent-light)] uppercase tracking-widest animate-pulse">
           Scanning_Environment...
        </span>
      </div>
    </motion.div>
  );
};

export default SidebarHUD;
