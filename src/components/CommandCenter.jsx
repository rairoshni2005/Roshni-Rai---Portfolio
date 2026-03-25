import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Edit3, Moon, Download, Zap, X, Search } from 'lucide-react';

const CommandCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const logs = [
    { id: 1, type: "milestone", text: "2024: Published Behance-inspired Portfolio v2", date: "Present" },
    { id: 2, type: "career", text: "Reliance Jio: 100+ Screens Audited for JioGames", date: "2023" },
    { id: 3, type: "career", text: "ITM BTL: 700+ Daily Registrations via Designed App", date: "2023" },
    { id: 4, type: "skills", text: "Mastered Framer Motion for High-End Interaction", date: "Ongoing" },
    { id: 5, type: "system", text: "Kernel: Roshni Rai / OS: Premium Creative", date: "Static" }
  ];

  const themes = [
    { name: "Cobalt (Classic)", primary: "#3b82f6", light: "#60a5fa" },
    { name: "Emerald (Fresh)", primary: "#10b981", light: "#34d399" },
    { name: "Ruby (Royal)", primary: "#e11d48", light: "#fb7185" },
    { name: "Amber (Vintage)", primary: "#f59e0b", light: "#fbbf24" }
  ];

  const commands = [
    { 
      id: 'night-vision', 
      title: 'Toggle Night Vision', 
      icon: <Moon className="w-5 h-5" />, 
      shortcut: ['N'],
      action: () => {
        window.dispatchEvent(new CustomEvent('toggle-night-vision'));
        setIsOpen(false);
      }
    },
    { 
      id: 'cv', 
      title: 'Download CV', 
      icon: <Download className="w-5 h-5" />, 
      shortcut: ['D'],
      action: () => {
        window.dispatchEvent(new CustomEvent('open-decryption'));
        setIsOpen(false);
      }
    },
    { 
      id: 'signature', 
      title: 'Update Signature', 
      icon: <Edit3 className="w-5 h-5" />, 
      shortcut: ['S'],
      action: () => {
        window.dispatchEvent(new CustomEvent('open-signature'));
        setIsOpen(false);
      }
    },
    { 
      id: 'vault', 
      title: 'Open Archive', 
      icon: <Archive className="w-5 h-5" />, 
      shortcut: ['A'],
      action: () => {
        window.dispatchEvent(new CustomEvent('open-vault'));
        setIsOpen(false);
      }
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'FOUND_CMD_K' } }));
          }
          return !prev;
        });
      }
      if (e.key === 'Escape') setIsOpen(false);

      // Handle command shortcuts when command center is open
      if (isOpen) {
        commands.forEach(cmd => {
          if (cmd.shortcut && cmd.shortcut.includes(e.key.toUpperCase())) {
            e.preventDefault();
            cmd.action();
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.style.setProperty('--color-accent', theme.primary);
    document.documentElement.style.setProperty('--color-accent-light', theme.light);
    window.dispatchEvent(new CustomEvent('unlock-achievement', { detail: { id: 'ALTERED_REALITY' } }));
  };

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLogs = logs.filter(log => 
    log.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div 
            className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Search Header */}
            <div className="p-6 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-4">
                <span className="text-[var(--color-accent-light)] font-mono text-xl">❯</span>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Identify yourself or search system logs..." 
                  className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-gray-600 font-light"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <kbd className="hidden md:block px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 font-mono">ESC</kbd>
              </div>
            </div>

            {/* Results Grid */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {/* System Commands */}
              {filteredCommands.length > 0 && (
                <div className="p-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 px-2">System Commands</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredCommands.map((cmd) => (
                      <button 
                        key={cmd.id}
                        onClick={cmd.action}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 group-hover:text-[var(--color-accent-light)] transition-colors">
                            {cmd.icon}
                          </span>
                          <span className="text-sm text-gray-300 font-light group-hover:text-white">{cmd.title}</span>
                        </div>
                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 font-mono group-hover:text-[var(--color-accent-light)] group-hover:border-[var(--color-accent-light)/30]">
                          {cmd.shortcut[0]}
                        </kbd>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Commands / Themes */}
              <div className="p-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 px-2">Alter Reality (Themes)</h4>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button 
                      key={t.name}
                      onClick={() => changeTheme(t)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group"
                    >
                      <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: t.primary, color: t.primary }} />
                      <span className="text-sm text-gray-300 font-light group-hover:text-white">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Logs */}
              <div className="p-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 px-2">System Logs</h4>
                <div className="space-y-1">
                  {filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-gray-600">[{log.type.toUpperCase()}]</span>
                        <span className="text-sm text-gray-300 font-light group-hover:text-white transition-colors">{log.text}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">{log.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Roshni's Portfolio Kernel v2.0.4</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 grayscale opacity-50">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandCenter;
