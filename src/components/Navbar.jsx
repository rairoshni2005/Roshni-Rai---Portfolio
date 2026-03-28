import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const currentItem = navItems.find((item) => item.href === `#${id}`);
          if (currentItem) {
            setActiveItem(currentItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    const achievementTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'LONG_STAY' } }));
    }, 60 * 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(achievementTimer);
    };
  }, []);

  const handleClick = (e, href, name) => {
    e.preventDefault();
    setActiveItem(name);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Standalone Brand Logo (Top Left) */}
      <motion.div 
        className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-[max(0.75rem,env(safe-area-inset-left))] z-50 mix-blend-difference"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <a 
          href="#home" 
          onClick={(e) => handleClick(e, '#home', 'Home')}
          className="text-white font-bold text-lg sm:text-2xl tracking-tighter group flex items-baseline gap-1"
        >
          <span>Roshni</span>
          <span className="font-serif italic font-light text-[var(--color-accent-light)] group-hover:text-white transition-colors">Rai</span>
        </a>
      </motion.div>

      <div className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] inset-x-0 z-50 flex justify-center px-2 sm:px-6 pointer-events-none">
        <motion.nav 
          className="bg-[#0a0a0a]/85 backdrop-blur-2xl border border-[var(--color-accent-light)]/20 rounded-[2rem] sm:rounded-[2.5rem] px-1.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-0.5 sm:gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto max-w-[calc(100vw-0.75rem)] overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              data-magnetic
              onClick={(e) => handleClick(e, item.href, item.name)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-2.5 py-2 sm:px-4 shrink-0 snap-center group touch-manipulation"
            >
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {hoveredItem === item.name && (
                  <motion.div 
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-md shadow-xl pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sliding Glass Background for Active Item */}
              {activeItem === item.name && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-x-1 inset-y-1 bg-white/10 backdrop-blur-md rounded-full border border-white/5 shadow-inner"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                 <motion.div 
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${activeItem === item.name ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-white/20 group-hover:bg-white/50'}`}
                    animate={{ 
                      scale: activeItem === item.name ? 1.2 : 1,
                    }}
                 />
              </div>
              <div className="absolute inset-0 cursor-pointer"></div>
            </a>
          ))}

          {/* New: System Terminal Toggle */}
          <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-center'))}
            onMouseEnter={() => setHoveredItem('System')}
            onMouseLeave={() => setHoveredItem(null)}
            data-magnetic
            className="relative px-2.5 py-2 sm:px-4 shrink-0 snap-center group touch-manipulation"
            aria-label="Open system terminal"
          >
            <AnimatePresence>
              {hoveredItem === 'System' && (
                <motion.div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-xl pointer-events-none whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  System Terminal <span className="opacity-50 ml-2">⌘K</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-accent)] rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-[var(--color-accent-light)] shadow-[0_0_8px_var(--color-accent)] group-hover:scale-125 transition-transform duration-300" />
            </div>
          </button>
        </motion.nav>
      </div>
      
      {/* Mobile Menu is now redundant with the dock, but we can refine it if needed. 
          The dock itself is quite mobile friendly. 
          I will keep the dock as the primary nav even on mobile, just maybe scale it. */}
    </>
  );
};

export default Navbar;
