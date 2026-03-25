import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const tracks = {
  stealth: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  orchestral: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  lofi: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
};

const AmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVibe, setCurrentVibe] = useState('stealth');
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);

  useEffect(() => {
    // One-time initialization of the Audio object
    const audio = new Audio(tracks[currentVibe]);
    audio.loop = true;
    audio.volume = 0.8; // Increased volume for better audibility
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleVibeChange = async (e) => {
      const newVibe = e.detail.vibe;
      if (!tracks[newVibe] || newVibe === currentVibe) return;

      const wasPlaying = !audioRef.current.paused;
      if (wasPlaying) audioRef.current.pause();

      audioRef.current.src = tracks[newVibe];
      setCurrentVibe(newVibe);

      if (wasPlaying) {
        try {
          await audioRef.current.play();
        } catch (err) { console.error("Vibe change play fail:", err); }
      }
    };

    window.addEventListener('change-vibe', handleVibeChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('change-vibe', handleVibeChange);
    };
  }, []); // Run only once on mount

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          const audioCtx = new AudioContextClass();
          const source = audioCtx.createMediaElementSource(audioRef.current);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
          
          audioCtxRef.current = audioCtx;
          sourceNodeRef.current = source;
          analyserRef.current = analyser;
          dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        }

        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
        
        await audioRef.current.play();
        startAnalysis();
      } catch (err) {
        console.error("Critical Audio Playback Error:", err);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const startAnalysis = () => {
    const updatePulse = () => {
      if (!audioRef.current || audioRef.current.paused) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avg = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
      const normalized = avg / 255;
      
      window.dispatchEvent(new CustomEvent('audio-pulse', { detail: { volume: normalized } }));
      animationRef.current = requestAnimationFrame(updatePulse);
    };
    
    updatePulse();
  };

  return (
    <div className="fixed top-8 right-8 z-[100000] flex flex-col items-end gap-3 pointer-events-none">
       <div className="flex gap-4 pointer-events-none md:flex-row-reverse">
         <motion.button 
            className={`pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 group transition-all duration-500 shadow-2xl ${
              isPlaying ? 'border-l-4 border-l-[var(--color-accent-light)] shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-l-4 border-l-gray-800'
            }`}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayback}
         >
            <div className={`transition-colors duration-500 ${isPlaying ? 'text-[var(--color-accent-light)]' : 'text-gray-500'}`}>
              {isPlaying ? (
                <div className="relative">
                  <Volume2 size={18} className="animate-pulse" />
                  <div className="absolute inset-0 bg-[var(--color-accent-light)] blur-md opacity-40 animate-ping" />
                </div>
              ) : (
                <VolumeX size={18} />
              )}
            </div>
            <div className="flex flex-col items-start leading-tight">
               <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-0.5">Atmosphere</span>
               <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-500 ${isPlaying ? 'text-white' : 'text-gray-600'}`}>
                 {isPlaying ? "Transmitting" : "Muted"}
               </span>
            </div>
         </motion.button>
       </div>
    </div>
  );
};

export default AmbientSound;
