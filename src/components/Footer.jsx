import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TerminalContact from './TerminalContact';

const Footer = () => {
  const [signature, setSignature] = React.useState(null);

  React.useEffect(() => {
    const loadSignature = () => {
      const saved = localStorage.getItem('roshni_achievements_signature') || localStorage.getItem('roshni_signature');
      setSignature(saved);
    };
    loadSignature();
    window.addEventListener('signature-updated', loadSignature);
    return () => window.removeEventListener('signature-updated', loadSignature);
  }, []);

  return (
    <footer className="w-full bg-[#0a0a0a] pt-40 pb-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <Section id="contact" theme="dark" className="min-h-fit py-0 mb-32">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-[1px] w-12 bg-white/10"></div>
              <span className="text-xs font-bold uppercase tracking-[0.5em] text-white/40">Secure Transmission</span>
              <div className="h-[1px] w-12 bg-white/10"></div>
            </div>

            <div className="mb-24">
              <TerminalContact />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-24"
          >
            <div className="flex gap-10">
              {[
                { href: "https://github.com/rairoshni2005", icon: FaGithub, label: "GitHub", hover: "hover:text-[var(--color-accent-light)]", border: "group-hover:border-[var(--color-accent-light)]" },
                { href: "https://www.linkedin.com/in/roshni-rai08/", icon: FaLinkedin, label: "LinkedIn", hover: "hover:text-[#0a66c2]", border: "group-hover:border-[#0a66c2]" },
                { href: "mailto:rairoshni2005@gmail.com", icon: Mail, label: "Email", hover: "hover:text-white", border: "group-hover:border-white" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`text-white/40 ${social.hover} transition-all duration-500 flex flex-col items-center gap-4 group`}
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  <div className={`w-20 h-20 rounded-full border border-white/10 flex items-center justify-center ${social.border} transition-all duration-500 relative`}>
                    <social.icon size={32} />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 blur-md transition-opacity"
                      initial={false}
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em]">{social.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="h-20 w-[1px] bg-white/10 hidden md:block"></div>

            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Direct Contact</p>
              <p className="text-3xl font-serif italic text-white/90">9082539451</p>
              <p className="text-gray-500 font-light mt-1">rairoshni2005@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="flex flex-col items-start gap-4">
          <div className="relative group">
            {signature ? (
              <motion.img 
                src={signature} 
                alt="Roshni Rai Signature" 
                className="h-16 w-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ) : (
              <motion.svg 
                width="200" 
                height="60" 
                viewBox="0 0 200 60" 
                className="text-white fill-none stroke-current opacity-40"
              >
                <motion.path
                  d="M20,40 Q30,10 40,40 T60,40 T80,40 T100,20 T120,40 T140,40 T160,40 T180,20" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </motion.svg>
            )}
            <div className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-[1px] bg-[var(--color-accent)] transition-all duration-700" />
          </div>
          <div className="text-white/20 text-[10px] font-mono tracking-[0.5rem] uppercase">
            © {new Date().getFullYear()} ROSHNI RAI
          </div>
        </div>
        <div className="flex gap-8 text-white/20 text-[10px] font-mono tracking-[0.3rem] uppercase">
          <span>Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
