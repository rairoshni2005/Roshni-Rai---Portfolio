import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Download, X } from 'lucide-react';

const ResumeDecryption = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("encrypted"); // encrypted, decrypting, success
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "decrypting") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("success");
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleDecrypt = () => setStatus("decrypting");

  const handleDownload = () => {
    // This assumes the user places resume.pdf in the public folder
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Roshni_Rai_Resume.pdf';
    link.click();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8 text-center"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="mb-8 flex justify-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${status === 'success' ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-white/5 border border-white/10'}`}>
                {status === 'success' ? <Unlock className="text-white" size={32} /> : <Lock className="text-white/40" size={32} />}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
              {status === 'encrypted' && "Classified Document"}
              {status === 'decrypting' && "Bypassing Security"}
              {status === 'success' && "Decryption Complete"}
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-8 font-mono">
              Item_ID: ROSHNI_CV_2024.DAT
            </p>

            {status === 'decrypting' && (
              <div className="mb-8">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="h-full bg-[var(--color-accent)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-gray-600 uppercase">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}

            {status === 'encrypted' && (
              <button 
                onClick={handleDecrypt}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-accent-light)] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Start Decryption
              </button>
            )}

            {status === 'success' && (
              <button 
                onClick={handleDownload}
                className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all animate-bounce flex items-center justify-center gap-3"
              >
                <Download size={18} />
                Download PDF
              </button>
            )}

            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
               <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-widest text-gray-500 mb-1">Clearance</span>
                  <span className="text-xs text-white font-mono">Level_4</span>
               </div>
               <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-widest text-gray-500 mb-1">Status</span>
                  <span className="text-xs text-[var(--color-accent)] font-mono animate-pulse">Scanning...</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeDecryption;
