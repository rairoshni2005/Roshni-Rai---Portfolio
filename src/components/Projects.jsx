import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

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

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative min-h-[85vh] h-auto md:h-[72vh] w-[90vw] md:w-[75vw] lg:w-[65vw] flex-shrink-0 flex items-center justify-center px-4 sm:px-10 py-6 md:py-0 group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-between w-full h-full p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-700">
        
        {/* Background Subtle Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-30"></div>

        {/* Liquid Foil Holographic Sheen */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-500 rounded-[3rem]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%),
                         radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--color-accent-rgb), 0.1), transparent 50%)`
          }}
        />

        <motion.div 
          ref={containerRef}
          className="w-full lg:w-1/2 relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#1a1a1a]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
          onTouchMove={handleTouchMove}
        >
          {/* Base Grayscale Image */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
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
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-2 text-white tracking-tighter leading-tight group-hover:text-[var(--color-accent-light)] transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-[var(--color-accent)] font-serif italic text-xl mb-4">
            {project.subtitle}
          </p>
          <p className="text-gray-400 text-base leading-relaxed font-light mb-6 line-clamp-2 lg:line-clamp-none">
            {project.description}
          </p>

          <div className="space-y-4 border-l border-gray-800 pl-4 sm:pl-6">
             <div className="group/item">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] opacity-60 mb-1 group-hover/item:opacity-100 transition-opacity">Goal</h4>
                <p className="text-gray-400 text-sm leading-snug font-light">{project.problem}</p>
             </div>
             <div className="group/item">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] opacity-60 mb-1 group-hover/item:opacity-100 transition-opacity">Outcome</h4>
                <p className="text-gray-400 text-sm leading-snug font-light" dangerouslySetInnerHTML={{__html: project.outcome}}></p>
             </div>
          </div>

          <div className="mt-8 flex justify-start">
            <Link 
              to={`/project/${project.title.toLowerCase().replace(/\s+/g, '_')}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-accent-light)]/30 text-[var(--color-accent-light)] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-accent-light)] hover:text-black transition-all"
            >
              View More Detailing
            </Link>
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

  const endScrollVw = useMemo(() => {
    const n = projects.length;
    return `-${n * 92 + 52}vw`;
  }, []);

  const x = useTransform(scrollYProgress, [0.2, 0.9], ["0%", endScrollVw]);

  return (
    <section 
      id="projects" 
      ref={targetRef} 
      className="relative min-h-[480vh] md:h-[600vh]"
    >
      <div className="sticky top-0 min-h-[100dvh] h-screen flex items-center overflow-hidden">
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

        <div className="relative w-full">
          {/* Section Header */}
          <div className="absolute top-0 left-0 w-full flex flex-col items-center z-20 pointer-events-none pt-8 sm:pt-12 md:pt-16 px-4">
            <motion.div 
               className="flex flex-col items-center"
               style={{ opacity: useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]) }}
            >
              <div className="flex justify-center items-center gap-4 mb-3">
                 <div className="w-12 h-[2px] bg-gray-600"></div>
                 <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Case Studies</span>
                 <div className="w-12 h-[2px] bg-gray-600"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none text-center">
                Selected <span className="font-serif italic font-light relative text-[var(--color-accent-light)]">Works</span>
              </h2>
            </motion.div>
          </div>

          {/* Horizontal Track */}
          <motion.div style={{ x }} className="flex gap-0 pl-[5vw] sm:pl-[10vw] pt-32 sm:pt-40 md:pt-48 items-center will-change-transform">
            {projects.map((proj, idx) => (
              <ProjectCard key={idx} project={proj} />
            ))}
            
          {/* End Card / Transition */}
          <div className="min-h-[50vh] h-[80vh] w-[85vw] sm:w-[40vw] flex-shrink-0 flex items-center justify-center px-6 sm:px-10">
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
