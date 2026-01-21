import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onConsultationClick?: () => void;
}

const Navbar = ({ onConsultationClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
  
      const sections = [
        'hero',
        'about',
        'intro',
        'gallery',
        'portfolio',
        'services',
        'packages',
        'contact',
      ];
  
      // marker: punkt w oknie, który uznajemy za "tu jestem"
      const marker = Math.min(200, window.innerHeight * 0.3);
  
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (!el) continue;
  
        const { top, bottom } = el.getBoundingClientRect();
  
        // sekcja jest aktywna, jeśli przecina marker
        if (top <= marker && bottom > marker) {
          setActiveSection(section);
          return;
        }
      }
  
      // fallback: jeśli jesteś na samym dole strony, ustaw contact
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
  
      if (atBottom) setActiveSection('contact');
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    // Ustaw aktywną sekcję od razu (np. po refreshu w połowie strony)
    handleScroll();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-60 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border text-foreground' 
          : 'bg-transparent '
      }`}
    >
      <div className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <motion.button
            onClick={() => {
              const el = document.getElementById('hero');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-display text-3xl font-bold text-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Studio
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'about', label: 'O mnie' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'services', label: 'Oferta' },
              { id: 'contact', label: 'Kontakt' },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative font-medium text-3xl uppercase tracking-wider transition-colors ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onConsultationClick}
            className="btn-primary text-3xl py-3 px-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Konsultacja
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
