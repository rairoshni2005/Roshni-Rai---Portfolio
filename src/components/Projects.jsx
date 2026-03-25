import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: "JioGames UX Research & Audit",
    subtitle: "Reliance Jio Platforms Ltd.",
    description: "Conducted exhaustive UX audit and research for JioGames STB and Cloud Games Web.",
    problem: "Identifying usability bottlenecks on Set-Top Box and Web interfaces.",
    process: "Execution of heuristic evaluations and comprehensive UX audits matching Nielsen's criteria.",
    outcome: "Actionable design roadmaps optimized accessibility and core user flows.",
    image: "/images/work1.png",
    tags: ["UX Research", "Design Audit"]
  },
  {
    title: "BTL App for ITM",
    subtitle: "Figma",
    description: "Designed a high-conversion UI/UX interface for student outreach.",
    problem: "Low engagement and friction-heavy registration process impacting reach.",
    process: "Rapid prototyping and iterative testing utilizing Figma to streamline funnels.",
    outcome: "Improved engagement by <strong class='text-white'>30%</strong> with <strong class='text-white'>700+ registrations</strong> in a day.",
    image: "/images/work2.png",
    tags: ["UI/UX Design", "Figma"]
  },
  {
    title: "Food Order App",
    subtitle: "Full-Stack Dev | Flutter + MERN Stack",
    description: "Developed a scalable full-stack food ordering platform.",
    problem: "Fragmented ordering systems with poor tracking and inefficient workflows.",
    process: "Engineered a client-server architecture using Flutter and Node.js with JWT auth.",
    outcome: "A fully functional system unifying browsing, ordering, and real-time tracking.",
    image: "/images/work3.png",
    tags: ["Flutter", "MERN Stack"]
  },
  {
    title: "ZapIt",
    subtitle: "MERN Stack Web App",
    description: "Developed a comprehensive full-stack delivery web application.",
    problem: "Fragmented systems for browsing, ordering, and tracking deliveries reliably.",
    process: "Engineered a robust backend infrastructure tied to a responsive React frontend.",
    outcome: "Deployed a feature-complete system unifying browsing, ordering, and live-tracking.",
    image: "/images/work4.png",
    tags: ["MERN Stack", "Full-Stack"]
  },
  {
    title: "TaskMate",
    subtitle: "Full-Stack Dev | Flask + SQLite",
    description: "Built a minimalist task management application focused on simplicity.",
    problem: "Cluttered task apps and lack of prioritization or recurring task support.",
    process: "Developed a Flask backend with SQLite and priority-based filtering logic.",
    outcome: "A clean and efficient task system for improved personal productivity.",
    image: "/images/work5.png",
    tags: ["Flask", "SQLite"]
  }
];

const ProjectCard = ({ project }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative h-[80vh] w-[90vw] md:w-[75vw] lg:w-[65vw] flex-shrink-0 flex items-center justify-center px-10 group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-between w-full h-full p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-700">
        
        {/* Background Subtle Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-30"></div>

        <motion.div 
          ref={containerRef}
          className="w-full lg:w-1/2 relative overflow-hidden rounded-[2rem] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#1a1a1a]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
        >
          {/* Base Grayscale Image */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale transition-all duration-700"
          />

          {/* X-Ray / Technical DNA Reveal */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-[#0a0a0a]"
            style={{
              clipPath: isHovered 
                ? `circle(120px at ${mousePos.x}px ${mousePos.y}px)` 
                : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
              WebkitClipPath: isHovered 
                ? `circle(120px at ${mousePos.x}px ${mousePos.y}px)` 
                : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            <div className="w-full h-full p-8 font-mono text-[10px] text-[var(--color-accent-light)] flex flex-col justify-center opacity-60">
               <div className="mb-2">{"{"}</div>
               <div className="pl-4">"id": "{project.title.toLowerCase().replace(/\s+/g, '_')}",</div>
               <div className="pl-4">"stack": {JSON.stringify(project.tags)},</div>
               <div className="pl-4">"encryption": "Level_4",</div>
               <div className="pl-4">"status": "Verified",</div>
               <div className="pl-4">"dna": "0x${Math.random().toString(16).slice(2, 10)}"</div>
               <div>{"}"}</div>
               
               {/* Decorative Grid Lines in Lens */}
               <div className="absolute inset-0 border border-[var(--color-accent)] opacity-20 pointer-events-none rounded-full" />
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-20" />
               <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--color-accent)] opacity-20" />
            </div>
          </motion.div>

          {/* Lens Border/Glow */}
          {isHovered && (
            <motion.div 
              className="absolute w-[240px] h-[240px] border border-white/20 rounded-full pointer-events-none z-10"
              style={{
                left: mousePos.x - 120,
                top: mousePos.y - 120,
              }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />
          )}
        </motion.div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          <div className="flex gap-2 mb-4 flex-wrap">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] bg-white/5">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-2 text-white tracking-tighter leading-tight group-hover:text-[var(--color-accent-light)] transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-[var(--color-accent)] font-serif italic text-xl mb-4">
            {project.subtitle}
          </p>
          <p className="text-gray-400 text-base leading-relaxed font-light mb-6 line-clamp-2 lg:line-clamp-none">
            {project.description}
          </p>

          <div className="space-y-4 border-l border-gray-800 pl-6 hidden md:block">
             <div className="group/item">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] opacity-60 mb-1 group-hover/item:opacity-100 transition-opacity">Goal</h4>
                <p className="text-gray-400 text-sm leading-snug font-light">{project.problem}</p>
             </div>
             <div className="group/item">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] opacity-60 mb-1 group-hover/item:opacity-100 transition-opacity">Outcome</h4>
                <p className="text-gray-400 text-sm leading-snug font-light" dangerouslySetInnerHTML={{__html: project.outcome}}></p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0.2, 0.9], ["0%", "-380vw"]); // Using vw for more predictable translation

  return (
    <section 
      id="projects" 
      ref={targetRef} 
      className="relative h-[600vh] bg-[#0a0a0a]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

        <div className="relative w-full">
          {/* Section Header */}
          <div className="absolute top-0 left-0 w-full flex flex-col items-center z-20 pointer-events-none pt-12 md:pt-16">
            <motion.div 
               className="flex flex-col items-center"
               style={{ opacity: useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]) }}
            >
              <div className="flex justify-center items-center gap-4 mb-3">
                 <div className="w-12 h-[2px] bg-gray-600"></div>
                 <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Case Studies</span>
                 <div className="w-12 h-[2px] bg-gray-600"></div>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
                Selected <span className="font-serif italic font-light relative text-[var(--color-accent-light)]">Works</span>
              </h2>
            </motion.div>
          </div>

          {/* Horizontal Track */}
          <motion.div style={{ x }} className="flex gap-0 pl-[10vw]">
            {projects.map((proj, idx) => (
              <ProjectCard key={idx} project={proj} />
            ))}
            
          {/* End Card / Transition */}
          <div className="h-[80vh] w-[40vw] flex-shrink-0 flex items-center justify-center px-10">
             <div className="text-center group/end">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-4 block group-hover/end:text-[var(--color-accent-light)] transition-colors">End of Case Studies</span>
                <h3 className="text-3xl font-serif italic text-gray-400 mb-6">The journey continues...</h3>
                <div className="w-20 h-[1px] bg-gray-800 mx-auto"></div>
                <p className="text-[10px] uppercase tracking-widest text-gray-600 mt-6">Scroll to explore further</p>
             </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
