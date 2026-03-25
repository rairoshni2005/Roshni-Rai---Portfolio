import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

const GhostCursor = () => {
  const [ghost, setGhost] = useState(null);

  useEffect(() => {
    const spawnGhost = () => {
      // Only spawn occasionally
      if (Math.random() > 0.4) {
         setGhost({
           id: Date.now(),
           start: { x: -100, y: Math.random() * window.innerHeight },
           end: { x: window.innerWidth + 100, y: Math.random() * window.innerHeight },
           mid: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
         });
         
         // Auto-despawn
         setTimeout(() => setGhost(null), 8000);
      }
    };

    const interval = setInterval(spawnGhost, 20000); // Check every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {ghost && (
        <motion.div 
          className="fixed z-[99999] pointer-events-none grayscale"
          style={{ mixBlendMode: 'difference', opacity: 0.4 }}
          initial={{ x: ghost.start.x, y: ghost.start.y, scale: 0.8 }}
          animate={{ 
            x: [ghost.start.x, ghost.mid.x, ghost.end.x],
            y: [ghost.start.y, ghost.mid.y, ghost.end.y],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 8, ease: "easeInOut" }}
        >
          <div className="relative">
            <MousePointer2 className="text-white fill-white/20" size={24} />
            <div className="absolute top-6 left-3 bg-white/10 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border border-white/5">
              Ghost_Roshni
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GhostCursor;
