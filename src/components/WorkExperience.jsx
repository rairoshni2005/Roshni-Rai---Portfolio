import React, { useRef } from 'react';
import Section from './Section';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experiences = [
  {
    role: "UX Research Intern",
    company: "Reliance Jio Platforms Ltd.",
    date: "07/2025 – 12/2025",
    intro: "Orchestrating end-to-end UX research for JioGames Set-Top Box and Cloud Gaming platforms.",
    responsibilities: [
      "Directed 30+ user interviews and established strategic competitor benchmarks.",
      "Architected high-fidelity Figma wireframes and logic-driven interactive prototypes.",
      "Engineered a phased UX roadmap with metrics-driven KPIs to unify product vision."
    ],
    impact: "Surfaced 18+ critical usability gaps; drove a <strong class='text-[var(--color-accent)] font-semibold'>30% surge</strong> in task success and <strong class='text-[var(--color-accent)] font-semibold'>20% navigation efficiency</strong>.",
    tools: "Nielsen’s Heuristics • User Journey Mapping • Task Flow Analysis • Figma"
  },
  {
    role: "UI/UX Intern",
    company: "LetsUpgrade",
    date: "07/2024 – 08/2024",
    intro: "Spearheaded UI/UX design for the BTL application platform through iterative testing cycles.",
    responsibilities: [
      "Sculpted 30+ bespoke screens, profoundly optimizing app navigation architectures.",
      "Executed rigorous pre-launch user testing sessions ensuring seamless deployment."
    ],
    impact: "Propelled engagement by <strong class='text-[var(--color-accent)] font-semibold'>30%</strong>; achieved over <strong class='text-[var(--color-accent)] font-semibold'>700+ registrations</strong> upon inaugural launch.",
    tools: "Figma • User-Centric Design • Rapid Prototyping"
  },
  {
    role: "Software Dev Intern",
    company: "LetsUpgrade",
    date: "12/2023 – 01/2024",
    intro: "Contributed to the core ITM B.Tech website development with a focus on high-performance features.",
    responsibilities: [
      "Crafted performance-critical frontend components for a seamless user journey.",
      "Maintained exacting standards for responsiveness and loading performance."
    ],
    impact: "Catalyzed a <strong class='text-[var(--color-accent)] font-semibold'>20% growth</strong> in user traffic and enhanced site performance metrics by <strong class='text-[var(--color-accent)] font-semibold'>15%</strong>.",
    tools: "Frontend Architecture • Performance Optimization"
  }
];

const WorkExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <Section id="work" theme="light" className="py-24 bg-[#fffaf5] relative overflow-hidden"> 
      <div className="max-w-5xl mx-auto px-6 relative" ref={containerRef}>
        
        {/* Animated Pulse Timeline Component */}
        <div className="absolute left-[34px] lg:left-[calc(33.333333%+48px)] top-40 bottom-20 w-[2px] bg-gray-100 hidden md:block">
           <motion.div 
             className="absolute top-0 left-0 w-full bg-[var(--color-accent)] origin-top shadow-[0_0_15px_var(--color-accent)]"
             style={{ scaleY: pathLength, height: "100%" }}
           />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-center"
        >
          <div className="flex justify-center items-center gap-6 mb-8">
             <div className="h-[1px] w-12 bg-gray-300"></div>
             <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">Professional Narrative</span>
             <div className="h-[1px] w-12 bg-gray-300"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 leading-none group cursor-default">
            Selected <span className="font-serif italic font-light text-gray-400 relative inline-block">
              Experience
              <motion.svg 
                className="absolute -bottom-1 left-0 w-full h-3 text-[var(--color-accent-light)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-700"
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
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              className="relative group grid grid-cols-1 lg:grid-cols-12 lg:gap-24 gap-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left Column: Side Info */}
              <div className="lg:col-span-4 pl-10 md:pl-0 md:pr-10 md:text-right relative">
                <div className="absolute left-[8px] md:left-auto md:right-[-51px] top-0 w-5 h-5 rounded-full bg-white border-2 border-[var(--color-accent)] z-20 shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:bg-[var(--color-accent)] transition-colors duration-500"></div>
                
                <span className="block text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">{exp.date}</span>
                <h3 className="text-4xl font-serif italic text-gray-900 leading-tight mb-2">{exp.company}</h3>
                <div className="w-12 h-1 bg-[var(--color-accent-light)] opacity-20 md:ml-auto"></div>
              </div>

              {/* Right Column: Roles and Content */}
              <div className="lg:col-span-8 lg:pl-16">
                <h4 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-500">
                  {exp.role}
                </h4>
                
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-8 italic">
                  "{exp.intro}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 pb-2 border-b border-gray-100">Responsibilities</h5>
                      <ul className="space-y-4">
                        {exp.responsibilities.map((res, i) => (
                          <li key={i} className="text-gray-600 font-light flex items-start">
                            <span className="text-[var(--color-accent)] mr-4 font-serif text-lg leading-none">†</span>
                            <span className="text-lg leading-relaxed">{res}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                   
                   <div className="flex flex-col justify-between">
                      <motion.div 
                        className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm border-l-4 border-l-[var(--color-accent)] cursor-default"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent-light)] mb-4">Strategic Impact</h5>
                        <p className="text-gray-800 text-lg leading-relaxed font-light" dangerouslySetInnerHTML={{__html: exp.impact}}></p>
                      </motion.div>

                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Technical Palette</h5>
                        <p className="text-gray-500 text-sm font-serif italic tracking-wide">{exp.tools}</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WorkExperience;
