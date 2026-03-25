import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  { id: 1, name: "UX Research", x: 20, y: 30, size: 80, color: "#3b82f6" },
  { id: 2, name: "UI Design", x: 50, y: 15, size: 100, color: "#e11d48" },
  { id: 3, name: "Product Strategy", x: 80, y: 30, size: 85, color: "#10b981" },
  { id: 4, name: "React JS", x: 35, y: 65, size: 90, color: "#60a5fa" },
  { id: 5, name: "Node / Express", x: 65, y: 65, size: 95, color: "#f59e0b" },
  { id: 6, name: "Full-Stack Dev", x: 50, y: 85, size: 110, color: "#ffffff" },
];

const connections = [
  [1, 2], [2, 3], [1, 4], [3, 5], [4, 6], [5, 6], [2, 6]
];

const SkillConstellation = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="relative w-full h-[600px] bg-black/40 rounded-[3rem] border border-white/5 overflow-hidden group cursor-default">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Connections */}
        {connections.map(([a, b], i) => {
          const from = skills.find(s => s.id === a);
          const to = skills.find(s => s.id === b);
          const isActive = hoveredNode === a || hoveredNode === b;
          
          return (
            <motion.line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={isActive ? "var(--color-accent-light)" : "rgba(255,255,255,0.05)"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {skills.map((skill) => (
        <motion.div
          key={skill.id}
          className="absolute flex flex-col items-center justify-center p-4 rounded-full border border-white/10 backdrop-blur-md cursor-pointer transition-all duration-500"
          style={{ 
            left: `${skill.x}%`, 
            top: `${skill.y}%`,
            width: skill.size,
            height: skill.size,
            transform: 'translate(-50%, -50%)',
            backgroundColor: hoveredNode === skill.id ? `${skill.color}22` : 'rgba(255,255,255,0.02)',
            borderColor: hoveredNode === skill.id ? skill.color : 'rgba(255,255,255,0.1)',
            boxShadow: hoveredNode === skill.id ? `0 0 30px ${skill.color}44` : 'none'
          }}
          onMouseEnter={() => setHoveredNode(skill.id)}
          onMouseLeave={() => setHoveredNode(null)}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <span className="text-[10px] text-center font-mono font-bold leading-tight uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ color: hoveredNode === skill.id ? 'white' : 'rgba(255,255,255,0.4)' }}>
            {skill.name}
          </span>
        </motion.div>
      ))}

      {/* HUD Overlay */}
      <div className="absolute top-8 left-8 p-4 border-l border-white/10 bg-black/20 backdrop-blur-md">
        <p className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/30 mb-2">Neural_Capability_Map</p>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)] animate-pulse" />
          <p className="text-xs font-mono text-white/60 tracking-widest">Authorized_Scan_in_Progress...</p>
        </div>
      </div>
      
      {/* Floating Description */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div 
            className="absolute bottom-8 right-8 p-6 border border-white/10 bg-black/60 backdrop-blur-xl max-w-xs rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
             <p className="text-[10px] font-mono text-[var(--color-accent-light)] mb-2 uppercase tracking-widest">Deployment_Insights</p>
             <p className="text-sm text-white/80 font-light leading-relaxed">
               {hoveredNode === 1 && "Leveraging cognitive psychology to identify and bridge usability gaps."}
               {hoveredNode === 2 && "Crafting high-fidelity, interactive systems using modern design tokens."}
               {hoveredNode === 3 && "Aligning business goals with user-centric engineering frameworks."}
               {hoveredNode === 4 && "Architecting scalable reactive components with performance-first logic."}
               {hoveredNode === 5 && "Developing secure, low-latency API layers for data-intensive applications."}
               {hoveredNode === 6 && "Bridging the gap between pixels and production-ready architecture."}
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillConstellation;
