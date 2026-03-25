import React, { useEffect, useRef } from 'react';

const FluidCursor = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1.0,
        age: 0.015, // Slower decay for more elegance
      });

      // Limit points to keep performance high
      if (points.current.length > 50) {
        points.current.shift();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const drawRibbon = (offset, width, alphaMultiplier, color) => {
      if (points.current.length < 3) return;

      ctx.beginPath();
      ctx.moveTo(points.current[0].x + offset, points.current[0].y + offset);

      for (let i = 1; i < points.current.length - 2; i++) {
        const p = points.current[i];
        const next = points.current[i + 1];
        const xc = (p.x + next.x) / 2 + offset;
        const yc = (p.y + next.y) / 2 + offset;

        ctx.quadraticCurveTo(p.x + offset, p.y + offset, xc, yc);
        
        const alpha = p.life * alphaMultiplier;
        ctx.strokeStyle = color.replace('ALPHA', alpha.toFixed(2));
        ctx.lineWidth = p.life * width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xc, yc);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        p.life -= p.age;
        if (p.life <= 0) {
          points.current.splice(i, 1);
          i--;
        }
      }

      if (points.current.length > 3) {
        // Layer 1: Outer Soft Glow (Royal Pearl)
        drawRibbon(0, 20, 0.05, 'rgba(255, 255, 255, ALPHA)');
        // Layer 2: Core Silk Line (White Gold)
        drawRibbon(0, 4, 0.2, 'rgba(255, 255, 255, ALPHA)');
        // Layer 3: Inner Thread (Pure White)
        drawRibbon(0, 1, 0.4, 'rgba(255, 255, 255, ALPHA)');
        
        // Subtle Golden Particle at the head
        const head = points.current[points.current.length - 1];
        const gradient = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 15);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(head.x - 15, head.y - 15, 30, 30);
      }

      requestAnimationFrame(render);
    };

    const animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999]"
      style={{ mixBlendMode: 'plus-lighter' }} // Screen/Plus-lighter for that ethereal glow
    />
  );
};

export default FluidCursor;
