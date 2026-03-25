import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Section id="about" theme="light" className="py-32 bg-[#fdfdfd]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
        {/* Left: Profile Area */}
        <motion.div 
          className="lg:col-span-4 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gray-100 z-0"></div>
            {/* Extremely smooth scaling on image hover per user feedback */}
            <img 
              src="/images/profile.png" 
              alt="Roshni Rai" 
              className="w-full h-full object-cover relative z-10 filter grayscale mix-blend-multiply transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-110"
            />
          </div>

          {/* Restored the rotating circle badge exactly as requested */}
          <motion.div 
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-white border border-gray-100 shadow-2xl rounded-full flex items-center justify-center p-8 z-30 hidden lg:flex cursor-default"
            initial={{ rotate: -15 }}
            whileHover={{ rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
             {/* Doodle Circle around badge */}
             <motion.svg 
               className="absolute inset-0 w-full h-full text-[var(--color-accent)] opacity-20 -z-10 scale-125"
               viewBox="0 0 100 100"
             >
               <motion.path
                 d="M50,10 A40,40 0 1,1 49.9,10"
                 fill="transparent"
                 stroke="currentColor"
                 strokeWidth="1"
                 strokeLinecap="round"
                 initial={{ pathLength: 0 }}
                 whileInView={{ pathLength: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
             </motion.svg>

             <p className="font-serif italic text-2xl text-[var(--color-accent)] text-center leading-tight">
               Hello, <br/> I'm Roshni.
             </p>
          </motion.div>
        </motion.div>

        {/* Right: Summary Text */}
        <motion.div 
          className="lg:col-span-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-[2px] bg-[var(--color-accent)]"></div>
             <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">About Me</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-10 tracking-tight text-gray-900 leading-[1.1] relative">
            <span className="block font-serif italic font-light text-[var(--color-accent)] mb-2 relative inline-block group cursor-default"> {/* Added group and cursor-default */}
              Expert in identifying
              {/* Doodle Underline */}
              <motion.svg 
                className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-accent-light)] opacity-60 group-hover:opacity-100 transition-all duration-700" // Added group-hover
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,10 Q50,0 100,10 T200,10 T300,10"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  // Added whileHover for wiggle effect on the underline doodle
                  whileHover={{ 
                    d: "M0,10 Q50,20 100,10 T200,5 T300,10", // A slightly different path for a wiggle
                    transition: { duration: 0.4, repeat: Infinity, repeatType: "mirror" }
                  }}
                />
              </motion.svg>
            </span> 
            <br className="hidden md:block" /> usablity issues & optimizing design.
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-gray-600 leading-relaxed text-2xl font-light">
               Results-oriented <strong className="font-semibold text-gray-900">UI/UX Researcher, Designer, & Full-Stack Developer</strong>.
            </p>
            <ul className="space-y-4 text-xl text-gray-500 font-light border-l-2 border-[var(--color-accent-light)] pl-6">
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"></div>
                 <span>Specializing in UX Research, UI Design, and Full-Stack Web Development.</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"></div>
                 <span>Proficient in React JS, Node, Express, HTML, and CSS environments.</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"></div>
                 <span>Consistently deploying scalable designs that heighten user engagement.</span>
              </li>
            </ul>
          </div>
          
          {/* Contact Details Grid - Fixed for mobile responsiveness to prevent overlapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 pt-10 border-t border-gray-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Email</p>
              <a href="mailto:rairoshni2005@gmail.com" className="text-sm md:text-base font-medium text-gray-900 hover:text-[var(--color-accent)] transition-colors break-words">rairoshni2005@gmail.com</a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Phone</p>
              <p className="text-sm md:text-base font-medium text-gray-900 tracking-wider">9082539451</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">GitHub</p>
              <a href="https://github.com/rairoshni2005" target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent-light)] underline-offset-4 hover:opacity-80 transition-opacity">/rairoshni2005</a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">LinkedIn</p>
              <a href="https://www.linkedin.com/in/roshni-rai08/" target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent-light)] underline-offset-4 hover:opacity-80 transition-opacity">/in/roshni-rai08</a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
