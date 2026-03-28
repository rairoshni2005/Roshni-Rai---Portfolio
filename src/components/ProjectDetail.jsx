import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import Section from './Section';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Scroll to top when loaded
    window.scrollTo(0, 0);
    const found = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '_') === id);
    setProject(found);
  }, [id]);

  if (!project) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-[#0a0a0a]">
        <h1 className="text-4xl font-bold mb-4 tracking-widest text-[var(--color-accent-light)]">404</h1>
        <p className="font-mono text-gray-500 uppercase tracking-widest mb-8">Access Denied: Record missing.</p>
        <Link to="/" className="text-xs uppercase tracking-widest hover:text-[var(--color-accent-light)] border-b border-transparent hover:border-[var(--color-accent-light)] transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Return to Base
        </Link>
      </div>
    );
  }

  return (
    <Section id="project-detail" className="min-h-screen pt-32 pb-20 relative overflow-hidden" theme="dark">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Link to="/" className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold mb-12">
          <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Hub
          </motion.div>
        </Link>

        {/* Header content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] bg-white/5">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-none mb-6">
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic text-white/60 mb-12">
            {project.subtitle}
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full aspect-video rounded-3xl overflow-hidden mb-20 border border-white/10 shadow-2xl relative"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-8 space-y-12"
          >
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)] animate-pulse"></span> Project Overview
              </h3>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-white/5"></div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]"></span> The Problem
              </h3>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]"></span> Process & Execution
              </h3>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                {project.process}
              </p>
            </div>

            {project.features && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]"></span> Key Features
                </h3>
                <ul className="list-none space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-lg font-light leading-relaxed">
                      <span className="text-[var(--color-accent-light)] mt-1">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.learnings && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]"></span> Learning Outcomes
                </h3>
                <ul className="list-none space-y-3">
                  {project.learnings.map((learning, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-lg font-light leading-relaxed">
                      <span className="text-[var(--color-accent-light)] mt-1">▹</span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-xl group">
               <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
               <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-4">Outcome & Impact</h3>
               <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed" dangerouslySetInnerHTML={{__html: project.outcome}}></p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-4"
          >
            <div className="sticky top-32 space-y-8">
              {(project.role || project.timeline) && (
                <div className="p-6 border border-white/10 rounded-2xl bg-[#111]">
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 border-b border-white/5 pb-4">Project Details</h4>
                  <div className="space-y-4">
                    {project.role && (
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/40 mb-1">Role</span>
                        <span className="text-sm text-white font-medium">{project.role}</span>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/40 mb-1">Timeline</span>
                        <span className="text-sm text-white font-medium">{project.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 border border-white/10 rounded-2xl bg-[#111]">
                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 border-b border-white/5 pb-4">Tech Stack & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-white/5 px-3 py-1 rounded text-xs text-white/70 font-medium border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.github && (
                <div className="flex flex-col gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all overflow-hidden bg-white/10 border border-white/20 rounded-xl hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]">
                    <span className="relative z-10 flex items-center gap-2">
                      <ExternalLink size={14} /> View on GitHub
                    </span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectDetail;
