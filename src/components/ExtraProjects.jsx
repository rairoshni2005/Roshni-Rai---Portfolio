import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const ExtraProjects = () => {
  return (
    <Section id="extra-projects" theme="light" className="py-24 overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Inspir<span className="font-serif italic font-light">ations</span>
        </motion.h2>
        <motion.p 
          className="text-gray-500 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A collection of creative UI explorations, minimal design concepts, and interactive prototypes built to push boundaries.
        </motion.p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[600px] mt-10">
        {/* Center Collage Mockup */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, zIndex: 50 }}
        >
          <div className="w-56 h-[450px] bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 rotate-2">
            <img src="/images/ins1.png" alt="UI" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>

         {/* Left Mockup 1 */}
         <motion.div 
          className="absolute left-[10%] top-[40%] -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: -100, rotate: -20 }}
          whileInView={{ opacity: 1, x: 0, rotate: -10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ scale: 1.05, zIndex: 50, rotate: -5 }}
        >
          <div className="w-48 h-[380px] bg-white p-2 rounded-3xl shadow-xl border border-gray-100">
            <img src="/images/ins2.png" alt="UI" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>

        {/* Right Mockup 1 */}
        <motion.div 
          className="absolute right-[10%] top-[30%] -translate-y-1/2 z-20"
          initial={{ opacity: 0, x: 100, rotate: 20 }}
          whileInView={{ opacity: 1, x: 0, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05, zIndex: 50, rotate: 5 }}
        >
          <div className="w-48 h-[380px] bg-white p-2 rounded-3xl shadow-xl border border-gray-100">
            <img src="/images/ins3.png" alt="UI" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>

         {/* Left Mockup 2 (Behind) */}
         <motion.div 
          className="absolute left-[20%] top-[70%] -translate-y-1/2 z-10"
          initial={{ opacity: 0, y: 100, rotate: -30 }}
          whileInView={{ opacity: 1, y: 0, rotate: -25 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05, zIndex: 50, rotate: -15 }}
        >
          <div className="w-40 h-[320px] bg-white p-2 rounded-3xl shadow-lg border border-gray-100 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/images/ins4.png" alt="UI" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>

        {/* Right Mockup 2 (Behind) */}
        <motion.div 
          className="absolute right-[25%] top-[75%] -translate-y-1/2 z-10"
          initial={{ opacity: 0, y: 100, rotate: 30 }}
          whileInView={{ opacity: 1, y: 0, rotate: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05, zIndex: 50, rotate: 10 }}
        >
          <div className="w-40 h-[320px] bg-white p-2 rounded-3xl shadow-lg border border-gray-100 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/images/ins5.png" alt="UI" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default ExtraProjects;
