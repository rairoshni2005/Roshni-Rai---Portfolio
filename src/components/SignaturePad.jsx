import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Trash2, Edit3 } from 'lucide-react';

const SignaturePad = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      const context = canvas.getContext('2d');
      // Ensure drawing coordinates are in CSS pixels (offsetX/offsetY).
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineCap = 'round';
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 2;
      ctxRef.current = context;
      setIsDrawing(false);
      setIsDirty(false);

      // Load the previously saved signature as default so refresh/open doesn't change it.
      const saved = localStorage.getItem('roshni_signature');
      if (saved) {
        const img = new Image();
        img.onload = () => {
          // Clear any existing strokes and paint the saved signature.
          context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
          context.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
        img.src = saved;
      } else {
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }
    }
  }, [isOpen]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const context = ctxRef.current;
    if (!context) return;
    setIsDirty(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = ctxRef.current;
    if (!context) return;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = ctxRef.current;
    if (context) context.closePath();
    setIsDrawing(false);
  };

  const clear = () => {
    const context = ctxRef.current;
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    setIsDirty(false);
  };

  const save = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    // Only persist when user actually drew/changed something.
    if (isDirty) {
      localStorage.setItem('roshni_signature', dataUrl);
      window.dispatchEvent(new CustomEvent('signature-updated'));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Edit3 size={18} className="text-[var(--color-accent)]" />
              Capture Signature
            </h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Sign with your mouse or trackpad</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-40 bg-black border border-white/5 rounded-xl cursor-crosshair touch-none"
          />
        </div>

        <div className="p-6 bg-white/[0.02] flex justify-between items-center">
          <button 
            onClick={clear}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} /> Clear
          </button>
          
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={save}
              className="px-8 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[var(--color-accent-light)] transition-all flex items-center gap-2"
            >
              <Check size={14} /> Save Signature
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignaturePad;
