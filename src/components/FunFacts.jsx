import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Coffee, Music, Terminal, Tent } from 'lucide-react';

const FactCard = ({ icon, text, delay }) => (
  <motion.div 
    className="bg-[#1a1a1a] border border-[#333] p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-[var(--color-accent)] transition-colors duration-300"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
  >
    <div className="text-[var(--color-accent-light)] mb-4 bg-gray-900 p-4 rounded-full">
      {icon}
    </div>
    <p className="text-gray-300 font-medium">{text}</p>
  </motion.div>
);

const FunFacts = () => {
  return (
    <Section id="fun-facts" theme="dark" className="py-24 border-t border-gray-800 relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Fun <span className="font-serif italic font-light">Facts</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <FactCard 
          icon={<Coffee size={32} />} 
          text="Powered by 100+ cups of coffee during hackathons" 
          delay={0.1} 
        />
        <FactCard 
          icon={<Music size={32} />} 
          text="Deep focus playlist keeps the creative juices flowing" 
          delay={0.2} 
        />
        <FactCard 
          icon={<Terminal size={32} />} 
          text="Started coding at age 15 to build custom game mods" 
          delay={0.3} 
        />
        <FactCard 
          icon={<Tent size={32} />} 
          text="Outdoor enthusiast and weekend hiker" 
          delay={0.4} 
        />
      </div>
      
      {/* Decorative large scribble/shape in background */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 border border-[#222] rounded-full opacity-50 -translate-y-1/2 pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 border border-[var(--color-accent)] rounded-full opacity-10 -translate-y-1/2 pointer-events-none -z-10 blur-xl"></div>
    </Section>
  );
};

export default FunFacts;
