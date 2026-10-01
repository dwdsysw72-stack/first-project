import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import Icon from './Icon.jsx';
import Magnetic from './Magnetic.jsx';
import { EASE_OUT } from './motion.js';

export const NAV_ITEMS = [
  { href: '#menu', label: 'תפריט' },
  { href: '#oven', label: 'איך זה נעשה' },
  { href: '#gallery', label: 'גלריה' },
  { href: '#visit', label: 'ביקור ומשלוח' },
];

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="לונה, לראש העמוד">
      <span className="logo-mark" aria-hidden="true"><Icon name="pizza" /></span>
      <span className="logo-name">לונה</span>
    </a>
  );
}

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setStuck(y > 8));

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}`}>
      {/* Reading progress: shows how far down the page you are. */}
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="wrap nav-row">
        <Logo />
        <nav className="nav-links" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => (
            <motion.a key={item.href} href={item.href} whileHover={{ y: -2 }}>{item.label}</motion.a>
          ))}
        </nav>
        <div className="nav-end">
          <Magnetic className="btn btn-primary btn-sm" href="#visit">להזמנה</Magnetic>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobileMenu"
            aria-label="תפריט ניווט"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'list'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'grid' }}
              >
                <Icon name={open ? 'x' : 'list'} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobileMenu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE_OUT }}
                >
                  <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
