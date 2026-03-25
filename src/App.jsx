import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Projects from './components/Projects';
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
import SignaturePad from './components/SignaturePad';
import FluidCursor from './components/FluidCursor';
import SidebarHUD from './components/SidebarHUD';
import NeuralLink from './components/NeuralLink';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    // Sync Achievements
    const saved = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
    setUnlocked(saved);

    const handleNightVision = () => setIsNightVision(prev => !prev);
    const handleVault = () => setIsArchiveOpen(true);
    const handleDecrypt = () => setIsDecrypting(true);
    const handleSignature = () => setIsSignatureOpen(true);
    const syncUnlocked = () => {
      const savedNew = JSON.parse(localStorage.getItem('roshni_achievements') || '[]');
      setUnlocked(savedNew);
    };

    window.addEventListener('toggle-night-vision', handleNightVision);
    window.addEventListener('open-vault', handleVault);
    window.addEventListener('open-decryption', handleDecrypt);
    window.addEventListener('open-signature', handleSignature);
    window.addEventListener('unlock-achievement', syncUnlocked);

    return () => {
      window.removeEventListener('toggle-night-vision', handleNightVision);
      window.removeEventListener('open-vault', handleVault);
      window.removeEventListener('open-decryption', handleDecrypt);
      window.removeEventListener('open-signature', handleSignature);
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
      <SignaturePad 
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
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
          <Navbar />
          <motion.div className="relative z-10">
            <main>
              <Hero />
              <About />
              <Skills />
              <WorkExperience />
              <Education />
              <Projects />
            </main>
          </motion.div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
