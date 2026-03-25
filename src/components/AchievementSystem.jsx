import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Shield, Zap, Brain } from 'lucide-react';

const achievements_config = {
  FOUND_CMD_K: { title: "System Breaker", desc: "Accessed the hidden Command Center.", icon: Shield, color: "bg-blue-500" },
  ALTERED_REALITY: { title: "Reality Glitch", desc: "Changed the site's primary accent color.", icon: Zap, color: "bg-amber-500" },
  HERO_DISTURBED: { title: "Annoyance Expert", desc: "Interrupted Roshni's work twice.", icon: Trophy, color: "bg-red-500" },
  NEURAL_ACCESS: { title: "Mind Hunter", desc: "Linked with Roshni's AI consciousness.", icon: Brain, color: "bg-cyan-500" },
  LONG_STAY: { title: "Dedicated Visitor", desc: "Stayed for 60 seconds.", icon: Star, color: "bg-purple-500" },
  FINAL_MASTER: { title: "The Master Explorer", desc: "Found every secret in the system. Respect.", icon: Zap, color: "bg-green-500" }
};

const AchievementSystem = () => {
  const [unlocked, setUnlocked] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Load from local storage
    const saved = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
    setUnlocked(saved);

    const handleAchievement = (e) => {
      const { id } = e.detail;
      const history = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
      
      // Always show notification for feedback
      setNotification(achievements_config[id]);
      setTimeout(() => setNotification(null), 5000);

      if (!history.includes(id)) {
        const newHistory = [...history, id];
        localStorage.setItem('roshni_achievements', JSON.stringify(newHistory));
        setUnlocked(newHistory);
        
        // Check for Master Explorer (now 5 secrets)
        const currentCount = newHistory.filter(h => h !== 'FINAL_MASTER').length;
        if (currentCount === 5 && id !== 'FINAL_MASTER') {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'FINAL_MASTER' } }));
          }, 6000);
        }
      }
    };

    window.addEventListener('unlock-achievement', handleAchievement);
    return () => window.removeEventListener('unlock-achievement', handleAchievement);
  }, []);

  return (
    <div className="fixed bottom-24 right-8 z-[100000] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 pointer-events-auto min-w-[300px]"
          >
            <div className={`w-12 h-12 rounded-xl ${notification.color} flex items-center justify-center shadow-lg`}>
              <notification.icon className="text-white" size={24} />
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-light)] mb-0.5">Achievement Unlocked</h4>
              <p className="text-white font-bold text-sm tracking-tight">{notification.title}</p>
              <p className="text-gray-500 text-[10px] font-light">{notification.desc}</p>
            </div>
            {/* Ambient pulse */}
            <div className="absolute inset-0 rounded-2xl bg-[var(--color-accent)] opacity-[0.03] animate-pulse pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem;
