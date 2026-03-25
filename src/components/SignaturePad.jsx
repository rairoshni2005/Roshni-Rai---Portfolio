import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Trash2, Edit3 } from 'lucide-react';

const SignaturePad = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      const context = canvas.getContext('2d');
      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 2;
      setCtx(context);
    }
  }, [isOpen]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    ctx.closePath();
    setIsDrawing(false);
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const save = () => {
    const dataUrl = canvasRef.current.toDataURL();
    localStorage.setItem('roshni_signature', dataUrl);
    window.dispatchEvent(new CustomEvent('signature-updated'));
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
