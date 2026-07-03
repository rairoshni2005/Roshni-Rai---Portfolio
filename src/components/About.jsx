import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Section id="about" theme="dark" className="py-32 md:py-48 relative overflow-hidden">
      {/* Ambient background glow matching the royal theme */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--color-accent)]/5 rounded-full mix-blend-screen filter blur-[150px] opacity-70 pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
      
      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center max-w-[90%] xl:max-w-7xl mx-auto relative z-10">
        
        {/* Left: Profile Area */}
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl">
            <div className="absolute inset-0 bg-[#050505]/20 z-10 group-hover:bg-transparent transition-colors duration-[1000ms]"></div>
            
            {/* Elegant lighting over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20 opacity-80"></div>

            <img 
              src="/images/profile.png?v=2"
              alt="Roshni Rai" 
              className="w-full h-full object-cover relative z-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </div>
                                                                 
          {/* Premium Rotating Badge */}
          <motion.div 
            className="absolute -bottom-8 -right-8 w-44 h-44 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.3)] rounded-full flex items-center justify-center p-6 z-30 hidden lg:flex cursor-default"
            initial={{ rotate: -15, y: 10 }}
            whileHover={{ rotate: 0, scale: 1.05, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
             {/* Glowing border ring */}
             <div className="absolute inset-2 border border-[var(--color-accent)]/20 rounded-full group-hover:border-[var(--color-accent)]/50 transition-colors duration-700"></div>

             <p className="font-serif italic text-2xl text-[var(--color-accent-light)] text-center leading-tight drop-shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)]">
               Hello, <br/> I'm Roshni.
             </p>
          </motion.div>
        </motion.div>

        {/* Right: Summary Text */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-[1px] bg-[var(--color-accent)]/60"></div>
             <span className="text-xs font-mono uppercase tracking-[0.5em] text-[var(--color-accent-light)]">About Me</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tighter text-white leading-[1.15] relative">
             Expert in identifying
             <br className="hidden md:block" /> 
             <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-light)] to-[var(--color-accent)] relative inline-block group cursor-default mt-2">
               usability issues 
               <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-light)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
             </span> 
             {" "}& optimizing design.
          </h2>
          
          <div className="space-y-8 mb-16">
            <p className="text-white/70 leading-relaxed text-xl md:text-2xl font-light">
               Results-oriented <strong className="font-serif italic text-white font-normal hover:text-[var(--color-accent-light)] transition-colors duration-500 drop-shadow-md">UI/UX Researcher, Designer, & Full-Stack Developer</strong>.
            </p>
            <ul className="space-y-5 text-lg md:text-xl text-white/40 font-light border-l border-[var(--color-accent)]/20 pl-8">
              <li className="flex items-center gap-4 group">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent-light)] group-hover:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.8)] transition-all duration-300 shrink-0"></div>
                 <span className="group-hover:text-white/80 transition-colors duration-300">Specializing in UX Research, UI Design, and Full-Stack Web Development.</span>
              </li>
              <li className="flex items-center gap-4 group">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent-light)] group-hover:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.8)] transition-all duration-300 shrink-0"></div>
                 <span className="group-hover:text-white/80 transition-colors duration-300">Proficient in React JS, Node, Express, Python, and C++ environments.</span>
              </li>
              <li className="flex items-center gap-4 group">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent-light)] group-hover:shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.8)] transition-all duration-300 shrink-0"></div>
                 <span className="group-hover:text-white/80 transition-colors duration-300">Consistently deploying scalable designs that heighten user engagement.</span>
              </li>
            </ul>
          </div>
          
          {/* Glassmorphic Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-white/5">
            {[
              { label: 'Email', value: 'rairoshni2005...', full: 'rairoshni2005@gmail.com', link: 'mailto:rairoshni2005@gmail.com' },
              { label: 'Phone', value: '9082539451', link: 'tel:9082539451' },
              { label: 'GitHub', value: '/rairoshni2005', link: 'https://github.com/rairoshni2005' },
              { label: 'LinkedIn', value: '/in/roshni-rai08', link: 'https://www.linkedin.com/in/roshni-rai08/' }
            ].map((contact, idx) => (
              <a 
                key={idx}
                href={contact.link}
                title={contact.full || contact.value}
                target={contact.label === 'Email' || contact.label === 'Phone' ? '_self' : '_blank'}
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-accent-light)] hover:bg-[var(--color-accent)]/5 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.1)] transition-all duration-500 backdrop-blur-sm"
              >
                <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-[var(--color-accent-light)] transition-colors mb-3">{contact.label}</p>
                <p className="text-sm font-medium text-white/60 group-hover:text-white transition-colors truncate">{contact.value}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
