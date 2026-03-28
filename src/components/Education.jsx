import React, { useRef, useState } from 'react';
import Section from './Section';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const educationData = [
  {
    title: "B.Tech: Computer Science & Engineering",
    school: "ITM Skills University, Kharghar",
    date: "Expected 08/2027",
    details: "Specializing in User Experience Design and Full-Stack Engineering."
  },
  {
    title: "Higher Secondary & Secondary Education",
    school: "Kendriya Vidyalaya ONGC, Panvel",
    date: "Completed 05/2023",
    details: "Science (PCM)"
  }
];

const memberData = [
  { role: "Co-Head, Placement Club", place: "ITM Skills University", date: "2023 – Present" },
  { role: "Student Representative", place: "External Cell Club – ITM", date: "Aug 2023 – Present" },
  { role: "NEP SAARTHI Student Ambassador", place: "UGC, India", date: "Oct 2024 – Present" },
  { role: "Anchor", place: "Republic Day Celebration", date: "" },
  { role: "Student Volunteer", place: "Wellness Carnival & U Fest", date: "" }
];

const activityData = [
  { role: "Organizer", place: "PIWOT Imagine Hackathon, Mumbai", date: "2025" },
  { role: "Volunteer", place: "Swift Mumbai Meetup & DevFest Mumbai", date: "2024" },
  { role: "Participant", place: "Hackathons & Tech Conferences, India", date: "2023–2025" }
];

const HolographicSheen = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div 
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(var(--color-accent-rgb), 0.15), transparent 60%)`
          )
        }}
      />
      {children}
    </div>
  );
};

const TimelineItem = ({ item, index, isLeft }) => {
  return (
    <div className={`w-full flex md:${isLeft ? 'justify-end' : 'justify-start'} justify-start items-center relative py-5 md:py-8 group cursor-default`}>
      {/* Node dot - ultra subtle */}
      <div className="absolute left-[3px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-[50%] md:-translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-white/20 bg-[#050505] z-10 transition-all duration-300 group-hover:scale-150 group-hover:bg-white/40 group-hover:border-white/40"></div>

      {/* Content flex box */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className={`w-full md:w-[45%] pl-8 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} relative`}
      >
        <h4 className="text-lg md:text-xl font-serif text-white/50 group-hover:text-white/90 transition-colors duration-300 mb-1">{item.role}</h4>
        <div className={`flex flex-col flex-wrap ${isLeft ? 'md:items-end' : 'md:items-start'} items-start gap-1`}>
          <span className="text-xs md:text-sm font-light tracking-wide text-white/30">{item.place}</span>
          {item.date && (
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/40 mt-1 uppercase">{item.date}</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const TimelineSection = ({ title, items }) => {
  return (
    <div className="relative mb-20 md:mb-32 max-w-4xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
         <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/20 inline-flex items-center justify-center gap-6 w-full">
           <span className="w-12 h-[1px] bg-white/10"></span>
           <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
           >
             {title}
           </motion.span>
           <span className="w-12 h-[1px] bg-white/10"></span>
         </h3>
      </div>
      
      <div className="relative w-full">
        {/* The main vertical connecting laser - deeply subtle */}
        <div className="absolute top-0 bottom-0 left-[3px] md:left-1/2 md:-translate-x-1/2 w-[1px] bg-white/5 group-hover:bg-white/10 transition-colors duration-700"></div>
        
        <div className="flex flex-col w-full">
          {items.map((item, idx) => (
             <TimelineItem 
               key={idx} 
               item={item} 
               index={idx} 
               isLeft={idx % 2 === 0} 
             />
          ))}
        </div>
      </div>
    </div>
  )
}

const Education = () => {
  return (
    <Section id="education" theme="dark" className="py-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-accent)]/10 rounded-full mix-blend-screen filter blur-[150px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-40 md:mb-56">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-none group cursor-default">
              Academia <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-accent)] relative inline-block drop-shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]">
                & Credentials
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <HolographicSheen className="h-full rounded-[2.5rem]">
                  <div className="p-10 md:p-14 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-[var(--color-accent-light)] transition-all duration-700 h-full flex flex-col justify-between group-hover:shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.1)]">
                    <div>
                      <span className="text-xs font-mono tracking-[0.4em] text-[var(--color-accent-light)] uppercase block mb-8 px-4 py-2 bg-[var(--color-accent)]/10 rounded-full w-fit border border-[var(--color-accent-light)]/20 shadow-sm">{edu.date}</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-[var(--color-accent-light)] transition-colors duration-500">{edu.title}</h3>
                      <p className="text-xl md:text-2xl text-white/50 font-serif italic mb-8">{edu.school}</p>
                    </div>
                    <p className="text-white/40 font-light text-lg md:text-xl border-t border-white/10 pt-8 mt-4 group-hover:text-white/60 transition-colors">
                      {edu.details}
                    </p>
                  </div>
                </HolographicSheen>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Majestic Timeline System for Memberships & Activities */}
        <div className="pt-20 border-t border-white/5">
          <TimelineSection title="Curated Memberships" items={memberData} />
          <TimelineSection title="Notable Endeavors" items={activityData} />
        </div>

      </div>
    </Section>
  );
};

export default Education;
