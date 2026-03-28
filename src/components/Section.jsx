import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ 
  children, 
  id, 
  theme = 'light', // 'light' or 'dark'
  className = '' 
}) => {
  const sectionClass = theme === 'dark' ? 'dark-section' : 'light-section';

  return (
    <section 
      id={id} 
      className={`relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-16 lg:px-24 flex flex-col justify-center min-h-[40vh] sm:min-h-[50vh] overflow-hidden scroll-mt-24 md:scroll-mt-28 ${sectionClass} ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.1] overflow-hidden -z-0">
         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
           <motion.svg 
              key={i}
              className="absolute w-12 h-12"
              style={{
                top: `${(i * 13) % 100}%`,
                left: `${(i * 17) % 100}%`,
                color: theme === 'dark' ? 'white' : 'black'
              }}
              viewBox="0 0 24 24"
              animate={{ 
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 360, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 15 + (i * 2),
                repeat: Infinity,
                ease: "linear"
              }}
           >
              {i % 2 === 0 ? (
                <path fill="currentColor" d="M11,11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
              ) : (
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              )}
           </motion.svg>
         ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px", amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
