import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NightVision = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden"
        >
          {/* Green Tint Overlay */}
          <div className="absolute inset-0 bg-green-900/10 mix-blend-color" />
          
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
          
          {/* Digital Noise Grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150" />
          
          {/* HUD Elements */}
          <div className="absolute top-10 left-10 border-l-2 border-t-2 border-green-500/40 w-20 h-20" />
          <div className="absolute top-10 right-10 border-r-2 border-t-2 border-green-500/40 w-20 h-20" />
          <div className="absolute bottom-10 left-10 border-l-2 border-b-2 border-green-500/40 w-20 h-20" />
          <div className="absolute bottom-10 right-10 border-r-2 border-b-2 border-green-500/40 w-20 h-20" />
          
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-green-500/60 font-mono text-[10px] uppercase tracking-[0.4em]">Tactical_View_Active // Rec_0x42</span>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-green-500/30 font-mono text-[8px] uppercase tracking-widest">
            ISO 400 // SHUTTER 1/60 // NV_GEN_4
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NightVision;
