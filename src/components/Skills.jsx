import React, { useRef, useState, useEffect } from 'react';
import Section from './Section';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const skills = [
  { name: "Usability Testing", cat: "Research" },
  { name: "Heuristic Evaluation", cat: "Research" },
  { name: "Data Documentation", cat: "Research" },
  { name: "UI/UX Prototyping", cat: "Design" },
  { name: "Journey Mapping", cat: "Design" },
  { name: "Persona Dev", cat: "Design" },
  { name: "React JS", cat: "Dev" },
  { name: "Node / Express", cat: "Dev" },
  { name: "JavaScript", cat: "Dev" },
  { name: "CSS / Tailwind", cat: "Dev" },
  { name: "Project Management", cat: "Soft" },
  { name: "Leadership", cat: "Soft" },
  { name: "Public Speaking", cat: "Soft" },
  { name: "Event Planning", cat: "Soft" }
];

const MagneticTag = ({ name, cat }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance and strength of attraction
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If mouse is within 200px, pull the tag
    if (distance < 250) {
      mouseX.set(distanceX * 0.4);
      mouseY.set(distanceY * 0.4);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getCatColor = () => {
    switch(cat) {
      case "Research": return "text-blue-400 border-blue-400/20 bg-blue-400/5";
      case "Design": return "text-purple-400 border-purple-400/20 bg-purple-400/5";
      case "Dev": return "text-[var(--color-accent-light)] border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5";
      default: return "text-gray-400 border-gray-400/20 bg-gray-400/5";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ x: dx, y: dy }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={resetMouse}
      className={`px-6 py-3 rounded-full border cursor-grab active:cursor-grabbing transition-colors duration-300 ${getCatColor()} backdrop-blur-sm whitespace-nowrap text-lg font-light tracking-wide shadow-lg hover:shadow-xl`}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <Section id="skills" theme="dark" className="py-32 bg-[#0a0a0a] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.03] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-20 items-center">
        
        <motion.div 
          className="lg:w-1/3 z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="w-10 h-[2px] bg-[var(--color-accent-light)]"></div>
             <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent-light)]">Expertise</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none text-white overflow-visible group cursor-default">
            The <span className="font-serif italic font-light relative inline-block text-[var(--color-accent-light)]">Toolkit</span>
          </h2>
          <p className="text-gray-400 text-xl font-light leading-relaxed max-w-sm">
            I've curated a specialized set of skills across research, design, and code—interactive, adaptive, and always evolving.
          </p>
          <p className="text-gray-600 text-xs mt-12 uppercase tracking-widest font-bold">
            Tip: Try dragging the tags
          </p>
        </motion.div>

        <motion.div 
          className="lg:w-2/3 flex flex-wrap gap-4 justify-center items-center py-20 relative min-h-[500px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 + 0.5, type: "spring", stiffness: 100 }}
            >
              <MagneticTag {...skill} />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </Section>
  );
};

export default Skills;
