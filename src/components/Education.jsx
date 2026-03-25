import React, { useRef, useState } from 'react';
import Section from './Section';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const educationData = [
  {
    title: "B.Tech: Computer Science and Engineering",
    school: "ITM Skills University, Kharghar",
    date: "Expected 08/2027",
    details: "Specializing in User Experience Design and Full-Stack Engineering."
  },
  {
    title: "Higher Secondary and Secondary Education",
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
  { role: "Volunteer", place: "Swift Mumbai Meetup, Google I/O watch Party, & DevFest Mumbai", date: "2024" },
  { role: "Participant", place: "Internal & External Hackathons, Tech Conferences, across India", date: "2023–2025" }
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
            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`
          )
        }}
      />
      {children}
    </div>
  );
};

const TiltCard = ({ title, items, isDark }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`p-10 rounded-[3rem] border transition-colors duration-700 h-full relative group shadow-2xl ${
        isDark ? 'bg-[#121212] border-white/5 text-white' : 'bg-white border-gray-100 shadow-gray-200/50'
      }`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        <h3 className={`text-4xl font-serif italic mb-10 tracking-tight ${isDark ? 'text-[var(--color-accent-light)]' : 'text-[var(--color-accent)]'}`}>
          {title}
        </h3>
        <ul className="space-y-6">
          {items.map((item, idx) => (
            <li key={idx} className="group/item relative">
              <div className="flex justify-between items-start mb-1">
                <strong className={`block text-xl font-bold tracking-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {item.role}
                </strong>
                {item.date && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-gray-500/20 text-gray-500">
                    {item.date}
                  </span>
                )}
              </div>
              <span className={`block text-base font-light italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.place}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <Section id="education" theme="light" className="py-32 bg-[#fff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Education Highlight */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-gray-900 leading-none group cursor-default">
              Academia <span className="font-serif italic font-light text-[var(--color-accent)] relative inline-block">
                & Credentials
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <HolographicSheen className="h-full rounded-[3rem]">
                  <div className="p-12 rounded-[3rem] bg-gray-50/50 border border-gray-100 hover:border-[var(--color-accent-light)] transition-all duration-700 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono tracking-[0.4em] text-gray-400 uppercase block mb-6 px-4 py-2 bg-white rounded-full w-fit shadow-sm">{edu.date}</span>
                      <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-[var(--color-accent)] transition-colors">{edu.title}</h3>
                      <p className="text-2xl text-gray-500 font-serif italic mb-6">{edu.school}</p>
                    </div>
                    <p className="text-gray-400 font-light text-lg border-t border-gray-100 pt-6">
                      {edu.details}
                    </p>
                  </div>
                </HolographicSheen>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch perspective-[1000px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard title="Curated Memberships" items={memberData} isDark={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard title="Notable Endeavors" items={activityData} isDark={false} />
          </motion.div>
        </div>

      </div>
    </Section>
  );
};

export default Education;
