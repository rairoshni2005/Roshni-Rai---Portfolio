import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const CaseStudyInfo = ({ title, intro, problem, process, outcome, link }) => (
  <div className="lg:px-8">
    <h3 className="text-3xl md:text-4xl font-serif italic mb-6 text-white">{title}</h3>
    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
      {intro}
    </p>
    
    <div className="space-y-6">
      <div>
        <h4 className="text-[var(--color-accent-light)] font-bold mb-2 tracking-wide uppercase text-sm">Problem</h4>
        <p className="text-gray-400">{problem}</p>
      </div>
      <div>
        <h4 className="text-[var(--color-accent-light)] font-bold mb-2 tracking-wide uppercase text-sm">Process</h4>
        <p className="text-gray-400">{process}</p>
      </div>
      <div>
        <h4 className="text-[var(--color-accent-light)] font-bold mb-2 tracking-wide uppercase text-sm">Outcome</h4>
        <p className="text-gray-400">{outcome}</p>
      </div>
    </div>
    
    <div className="mt-8">
        <a href={link} className="inline-flex items-center gap-2 border border-gray-600 rounded-full px-6 py-3 text-white hover:bg-white hover:text-black transition duration-300">
            View Live Status
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
    </div>
  </div>
);

const MobileMockup = ({ imgSrc, float = "y", delay=0 }) => (
  <motion.div 
    className="w-full max-w-[280px] md:max-w-sm mx-auto"
    animate={{ y: float === "y" ? [0, -15, 0] : 0, x: float === "x" ? [0, 15, 0] : 0 }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <div className="border-[8px] md:border-[12px] border-[#222] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-[#111] aspect-[9/19]">
      {/* Dynamic Island Placeholder */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#222] rounded-full z-10"></div>
      <img src={imgSrc} alt="App Screen" className="w-full h-full object-cover" />
    </div>
  </motion.div>
);

const CaseStudies = () => {
  return (
    <>
      <Section id="work-1" theme="dark" className="border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            <MobileMockup imgSrc="/images/work1.png" delay={0} />
            
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <CaseStudyInfo 
              title="Dance App UI"
              intro="A beautiful mobile interface crafted to foster user engagement through minimal, intuitive design paths. This iteration focuses on connecting users seamlessly with instructors and classes."
              problem="The existing application faced a high drop-off rate because of a cluttered interface, making class booking burdensome."
              process="Utilized an extensive user-journey mapping phase and rapid wireframing to distill the core actions down to 2-3 taps."
              outcome="Increased engagement by 30% and achieved 700+ new user registrations within a single month of deployment."
              link="#"
            />
          </motion.div>
        </div>
      </Section>

      <Section id="work-2" theme="dark" className="border-t border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CaseStudyInfo 
              title="V-care Health"
              intro="Empowering patients with a streamlined approach to healthcare tracking and appointment fulfillment through an accessible remote-first platform."
              problem="Usability testing revealed users struggling with complex navigation hindering them from locating essential medical records."
              process="Conducted A/B testing on completely redesigned navigational flows and significantly increased touch targets."
              outcome="Task success rate increased by 30%, and average navigation time was reduced by 20% across all target demographic bands."
              link="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <MobileMockup imgSrc="/images/work2.png" float="x" delay={1} />
             {/* Background decorative blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default CaseStudies;
