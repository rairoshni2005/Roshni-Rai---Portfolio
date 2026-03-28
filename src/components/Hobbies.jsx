import React, { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';

const hobbies = [
  {
    id: "01",
    title: "Culinary Arts",
    keywords: "Cooking • Gastronomy",
    description: "Experimenting with global recipes and mastering the delicate art of cooking. Every dish is a design of flavors.",
    icon: "🍽️",
    color: "from-cyan-500/20 to-blue-900/10",
    border: "border-cyan-500/50",
    accent: "text-cyan-400"
  },
  {
    id: "02",
    title: "Movement",
    keywords: "Dancing • Rhythm",
    description: "Expressing energy and embracing the beat. Dancing is my way of aligning physical flow with mental clarity.",
    icon: "✧",
    color: "from-fuchsia-500/20 to-purple-900/10",
    border: "border-fuchsia-500/50",
    accent: "text-fuchsia-400"
  },
  {
    id: "03",
    title: "Crafter's Realm",
    keywords: "Art • DIY • Origami",
    description: "Painting, drawing, and precise Origami. Turning pure imagination into tangible, royal beauty.",
    icon: "✂️",
    color: "from-purple-500/20 to-indigo-900/10",
    border: "border-purple-500/50",
    accent: "text-purple-400"
  },
  {
    id: "04",
    title: "Action",
    keywords: "Badminton • Kabaddi",
    description: "Smashing shuttlecocks and raiding in Kabaddi. Agility, raw strength, strategy, and pure kinetic energy.",
    icon: "🏅",
    color: "from-blue-500/20 to-cyan-900/10",
    border: "border-blue-500/50",
    accent: "text-blue-400"
  },
  {
    id: "05",
    title: "Leadership",
    keywords: "Hackathons • Volunteering",
    description: "Organizing epic meetups and events. Dedicated community involvement to uplift and grow together.",
    icon: "👑",
    color: "from-[var(--color-accent)]/20 to-[#4B0082]/10",
    border: "border-[var(--color-accent-light)]/50",
    accent: "text-[var(--color-accent-light)]"
  }
];

const Hobbies = () => {
  const [active, setActive] = useState(0);

  return (
    <Section id="hobbies" theme="dark" className="py-24 md:py-32 relative overflow-hidden">
      {/* Royal Ambient Glows */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[var(--color-accent)]/10 rounded-full mix-blend-screen filter blur-[200px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-[95%] xl:max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-accent-light)]/50"></div>
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-accent-light)]">Beyond the Code</span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-accent-light)]/50"></div>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-none">
            Personal <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-[var(--color-accent)] drop-shadow-[0_0_30px_rgba(100,200,255,0.2)]">Interests</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row w-full min-h-0 md:h-[85vh] md:min-h-[500px] md:max-h-[700px] gap-3 md:gap-2">
          {hobbies.map((hobby, idx) => {
            const isActive = active === idx;
            return (
              <div
                key={hobby.id}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => e.key === 'Enter' && setActive(idx)}
                role="button"
                tabIndex={0}
                className={`group relative overflow-hidden flex flex-col justify-end p-5 sm:p-6 md:p-10 cursor-pointer border border-white/5 bg-[#0a0a0a] transition-[flex,border-radius,box-shadow,opacity] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] touch-manipulation min-h-[4.5rem] md:min-h-0
                  ${isActive ? 'flex-[3] md:flex-[4] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-[min(40vh,320px)] md:min-h-0' : 'flex-1 rounded-2xl md:rounded-[2rem] opacity-80 md:opacity-70 hover:opacity-100'}`}
              >
                {/* Active Border Overlay */}
                <div className={`absolute inset-0 border-[1px] rounded-[inherit] pointer-events-none transition-colors duration-700 ${isActive ? hobby.border : 'border-transparent group-hover:border-white/20'}`}></div>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${hobby.color} opacity-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'group-hover:opacity-20'}`}></div>
                
                {/* Visual Noise Pattern */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>

                {/* ID Badge */}
                <div className={`absolute top-6 left-6 md:top-10 md:left-10 text-white/40 font-mono text-sm tracking-widest transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
                  {hobby.id}
                </div>

                {/* Title (Vertical on desktop when inactive) */}
                {!isActive && (
                  <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                    <h3 className="text-white font-light tracking-[0.3em] uppercase text-xl md:text-2xl whitespace-nowrap -rotate-90 origin-center transition-opacity duration-[800ms]">
                      {hobby.title}
                    </h3>
                  </div>
                )}

                <div className={`relative z-10 w-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0 md:opacity-0'}`}>
                  <div className="flex items-center gap-4 mb-4">
                     <span className={`text-5xl md:text-6xl ${hobby.accent} drop-shadow-2xl`}>{hobby.icon}</span>
                  </div>

                  <h3 className={`text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4`}>
                    {hobby.title}
                  </h3>
                  
                  <div className="overflow-hidden">
                    <p className={`text-sm tracking-[0.2em] mb-4 font-bold uppercase ${hobby.accent}`}>
                      {hobby.keywords}
                    </p>
                    <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-lg">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
};

export default Hobbies;
