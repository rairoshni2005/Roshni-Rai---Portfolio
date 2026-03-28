import React, { useState, useEffect } from 'react';

const CHARS = '!<>-_/[]{}—=+*^?#_';

const ScrambleText = ({ text, delay = 0, duration = 1500, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let frameId;
    let startTime;
    
    // Pre-fill with empty spaces to reserve the bounding box
    setDisplayText(text.replace(/./g, ' '));
    
    const startTimeout = setTimeout(() => {
      startTime = Date.now();

      const scramble = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const correctChars = Math.floor(progress * text.length);
        
        let newText = '';
        for (let i = 0; i < text.length; i++) {
          if (i < correctChars) {
            newText += text[i];
          } else {
            newText += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(newText);

        if (progress < 1) {
          frameId = requestAnimationFrame(scramble);
        } else {
          setDisplayText(text);
        }
      };

      frameId = requestAnimationFrame(scramble);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;
