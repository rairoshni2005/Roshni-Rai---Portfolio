import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star, Shield, Zap } from 'lucide-react';

const achievements_config = {
  FOUND_CMD_K: { title: "System Breaker", desc: "Accessed the hidden Command Center.", icon: Shield, color: "bg-blue-500" },
  ALTERED_REALITY: { title: "Reality Glitch", desc: "Changed the site's primary accent color.", icon: Zap, color: "bg-amber-500" },
  HERO_DISTURBED: { title: "Annoyance Expert", desc: "Interrupted Roshni's work twice.", icon: Trophy, color: "bg-red-500" },
  LONG_STAY: { title: "Dedicated Visitor", desc: "Stayed for 60 seconds.", icon: Star, color: "bg-purple-500" },
  FINAL_MASTER: { title: "The Master Explorer", desc: "Found every secret in the system. Respect.", icon: Zap, color: "bg-green-500" }
};

const AchievementVault = ({ isOpen, onClose, unlocked }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200001] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
           <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="p-10 border-b border-white/5 flex justify-between items-center">
               <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight uppercase">The Archive</h2>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-1">Found {unlocked.length} / 5 Secret Trophies</p>
               </div>
               <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="text-white" size={20} />
               </button>
            </div>

            <div className="p-10 overflow-y-auto grid md:grid-cols-2 gap-6 scrollbar-hide">
               {Object.entries(achievements_config).map(([id, config]) => {
                 const isUnlocked = unlocked.includes(id);
                 return (
                   <div 
                    key={id}
                    className={`p-6 rounded-3xl border transition-all duration-500 ${isUnlocked ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-white/5 opacity-30 grayscale'}`}
                   >
                     <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isUnlocked ? config.color : 'bg-white/5'}`}>
                           <config.icon className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-white font-bold text-sm tracking-tight">{config.title}</h4>
                           <p className="text-gray-500 text-[10px] leading-relaxed mt-1">{isUnlocked ? config.desc : "Requirement: [REDACTED]"}</p>
                        </div>
                     </div>
                   </div>
                 );
               })}
            </div>

            <div className="p-10 mt-auto bg-white/[0.02] border-t border-white/5 text-center">
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-bold italic">Persistence is the only path to mastery.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AchievementVault;
