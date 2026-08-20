import React from 'react';
import Section from './Section';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CalendarDays, Compass, Crown } from 'lucide-react';

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
  { role: "Co-Head, Placement Club", place: "ITM Skills University", date: "2023 – Present", details: "Supporting placement activities, student coordination, and career-focused initiatives." },
  { role: "Student Representative", place: "External Cell Club – ITM", date: "Aug 2023 – Present", details: "Connecting students with academic stakeholders and supporting external engagement." },
  { role: "NEP SAARTHI Student Ambassador", place: "University Grants Commission (UGC), India", date: "Oct 2024 – Present", details: "Promoting NEP 2020 awareness through student engagement and educational policy communication." },
  { role: "Event Anchor & Host", place: "ITM Skills University", date: "2026 – Present", details: "Hosting academic, technical, cultural, and institutional events with confident stage management." },
  { role: "Social Media Volunteer", place: "Swift Mumbai", date: "2026 – Present", details: "Supporting technology community outreach through event promotion, communication, and digital content." }
];

const activityData = [
  { role: "Organizer & Host", place: "SummerHacks 2026 · ITM Skills University", date: "May 2026", details: "Helped organize and host a 24-hour intercollegiate hackathon with 600+ participants from 20+ institutions across multiple states.", featured: true },
  { role: "Event Organizer", place: "B.Tech & MCA Inaugurations 2026 · ITM Skills University", date: "Aug 2026", details: "Supported registrations, logistics, hospitality, certificates, volunteer coordination, and on-ground execution for two university inaugurations." },
  { role: "Performer", place: "Reliance Family Day 2025 · Jio Platforms Limited", date: "Dec 2025", details: "Selected through auditions to perform alongside Shankar Mahadevan, Siddharth Mahadevan, and Shiv Mahadevan before 100,000+ attendees.", featured: true },
  { role: "Event Organizer", place: "PIWOT Imagine Hackathon 2025 · PanIIT Alumni India", date: "2025", details: "Supported registration, hospitality, participant engagement, volunteer coordination, and event operations at Jio World Convention Centre, Mumbai." },
  { role: "Volunteer", place: "Google DevFest Mumbai", date: "2024", details: "Supported attendee registration, event logistics, participant engagement, and community activities." },
  { role: "Volunteer", place: "Google I/O Watch Party", date: "2024", details: "Supported event coordination, attendee engagement, logistics management, and community interaction." },
  { role: "Participant", place: "Hackathons & Tech Conferences · India", date: "2023 – 2025", details: "Participated in hackathons, developer meetups, conferences, and community events focused on technology and collaboration." }
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

const SectionEyebrow = ({ children, accent = false }) => (
  <div className={`mb-8 flex items-center gap-3 text-sm font-mono uppercase tracking-[0.22em] ${accent ? 'text-[var(--color-accent-light)]' : 'text-white/55'}`}>
    <span className={`h-px w-8 ${accent ? 'bg-[var(--color-accent-light)]/60' : 'bg-white/30'}`} />
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  </div>
);

const MembershipsSection = ({ items }) => {
  return (
    <div className="mb-20 md:mb-28">
      <SectionEyebrow accent>Leadership &amp; Roles</SectionEyebrow>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition-colors duration-500 hover:border-[var(--color-accent-light)]/60"
          >
            <Crown className="absolute -right-2 -top-2 h-20 w-20 rotate-12 text-white/[0.035] transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110" />
            <span className="relative z-10 text-sm font-mono text-[var(--color-accent-light)]/80">0{index + 1}</span>
            <div className="relative z-10 mt-10 flex-1">
              <h4 className="text-xl font-semibold leading-snug text-white/90 group-hover:text-white">{item.role}</h4>
              <p className="mt-3 text-base leading-relaxed text-white/55">{item.place}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/45">{item.details}</p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/40">{item.date}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

const EndeavorsSection = ({ items }) => {
  return (
    <div className="relative max-w-5xl">
      <SectionEyebrow>Notable Endeavors</SectionEyebrow>
      <div className="relative ml-2 border-l border-white/15 pl-6 sm:ml-5 sm:pl-10">
        {items.map((item, index) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: index * 0.12 }}
            className={`group relative border-b border-white/10 py-7 first:pt-2 last:border-0 ${item.featured ? 'rounded-2xl border border-[var(--color-accent-light)]/35 bg-[var(--color-accent)]/[0.08] px-5 my-3' : ''}`}
          >
            <span className="absolute -left-[2.05rem] top-8 h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-[var(--color-accent-light)] shadow-[0_0_0_4px_rgba(var(--color-accent-rgb),0.15)] sm:-left-[2.65rem]" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white/40">
                  <Compass className="h-4 w-4 text-[var(--color-accent-light)]" /> {item.role}
                </div>
                <h4 className="text-xl font-medium leading-snug text-white/90 transition-colors group-hover:text-[var(--color-accent-light)] sm:text-2xl">{item.place}</h4>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/50 sm:text-base">{item.details}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-mono text-white/55">
                <CalendarDays className="h-3.5 w-3.5" /> {item.date || 'Ongoing'}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

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
          <MembershipsSection items={memberData} />
          <EndeavorsSection items={activityData} />
        </div>

      </div>
    </Section>
  );
};

export default Education;
