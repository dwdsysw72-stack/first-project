import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useScrolledPast from './useScrolledPast.js';

const NAV_ITEMS = [
  { id: 'hero', label: 'בית' },
  { id: 'services', label: 'שירותים' },
  { id: 'team', label: 'הצוות' },
  { id: 'gallery', label: 'גלריה' },
  { id: 'testimonials', label: 'לקוחות ממליצים' },
  { id: 'contact', label: 'צור קשר' },
];

// Scrollspy: tracks which nav section is currently in view.
function useActiveSection() {
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -60% 0px' });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Header() {
  const scrolled = useScrolledPast(40);
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id="siteHeader"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-ink/90 backdrop-blur-md border-hair' : 'border-transparent'}`}
    >
      <nav className={`max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <a href="#hero" className="flex items-center gap-3 group cursor-pointer" aria-label="NOIR — לעמוד הבית">
          <span className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center font-serif text-gold-bright text-lg group-hover:bg-gold group-hover:text-ink transition-colors duration-300">N</span>
          <span className="font-serif text-xl tracking-wide text-ivory">NOIR<span className="text-gold-light"> .</span></span>
        </a>

        <ul className="hidden lg:flex items-center gap-10 font-sans text-[15px] text-muted">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`nav-link hover:text-ivory transition-colors duration-200 ${active === id ? 'text-ivory' : ''}`}>
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute right-0 left-0 -bottom-[6px] h-[1.5px] bg-gold-light"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden sm:inline-flex btn-shine items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-gold transition-colors duration-200 cursor-pointer">
            קביעת תור
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט'}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-hair text-ivory hover:border-gold transition-colors duration-200 cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.svg
                key={menuOpen ? 'close' : 'menu'}
                className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />}
              </motion.svg>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobileMenu"
            key="mobileMenu"
            className="lg:hidden overflow-hidden bg-ink border-t border-hair"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="flex flex-col px-5 py-4 gap-1 font-sans text-[15px]">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={closeMenu} className="block py-3 text-muted hover:text-gold-bright transition-colors">{label}</a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#booking" onClick={closeMenu} className="block text-center bg-gold text-white font-semibold py-3 rounded-full">קביעת תור</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
