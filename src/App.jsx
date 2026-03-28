import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import VibeIndicator from './components/VibeIndicator';
import CommandCenter from './components/CommandCenter';
import CustomCursor from './components/CustomCursor';
import AchievementSystem from './components/AchievementSystem';
import GhostCursor from './components/GhostCursor';
import NightVision from './components/NightVision';
import AchievementVault from './components/AchievementVault';
import ResumeDecryption from './components/ResumeDecryption';
import WarpDrive from './components/WarpDrive';
import ParticleWeb from './components/ParticleWeb';

import FluidCursor from './components/FluidCursor';
import SidebarHUD from './components/SidebarHUD';
import NeuralLink from './components/NeuralLink';

import Lenis from 'lenis';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    // Lenis on tablet/desktop only — native scroll on phones avoids touch jank
    const mq = window.matchMedia('(min-width: 768px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis = null;

    const attachLenis = () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      if (mq.matches && !reduceMotion.matches) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        });
      }
    };

    attachLenis();
    mq.addEventListener('change', attachLenis);
    reduceMotion.addEventListener('change', attachLenis);

    let rafId;
    function raf(time) {
      if (lenis) lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync Achievements
    const saved = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
    setUnlocked(saved);

    const handleNightVision = () => setIsNightVision(prev => !prev);
    const handleVault = () => setIsArchiveOpen(true);
    const handleDecrypt = () => setIsDecrypting(true);

    const syncUnlocked = () => {
      const savedNew = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
      setUnlocked(savedNew);
    };

    window.addEventListener('toggle-night-vision', handleNightVision);
    window.addEventListener('open-vault', handleVault);
    window.addEventListener('open-decryption', handleDecrypt);

    window.addEventListener('unlock-achievement', syncUnlocked);

    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener('change', attachLenis);
      reduceMotion.removeEventListener('change', attachLenis);
      if (lenis) lenis.destroy();
      window.removeEventListener('toggle-night-vision', handleNightVision);
      window.removeEventListener('open-vault', handleVault);
      window.removeEventListener('open-decryption', handleDecrypt);

      window.removeEventListener('unlock-achievement', syncUnlocked);
    };
  }, []);

  return (
    <div className="font-sans antialiased bg-[#0a0a0a]">
      <NightVision active={isNightVision} />
      <AchievementVault 
        isOpen={isArchiveOpen} 
        onClose={() => setIsArchiveOpen(false)} 
        unlocked={unlocked}
      />
      <ResumeDecryption 
        isOpen={isDecrypting} 
        onClose={() => setIsDecrypting(false)} 
      />
      <FluidCursor />
      <GhostCursor />
      <WarpDrive />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <AchievementSystem />
          <CommandCenter />
          <VibeIndicator />
          <SidebarHUD />
          <NeuralLink />
          <CustomCursor />
          <div className="noise-overlay" />
          <ParticleWeb />
          <Navbar />
          <motion.div className="relative z-10 pb-28 md:pb-0">
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <WorkExperience />
                  <Education />
                  <Hobbies />
                  <Projects />
                </main>
              } />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </motion.div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
