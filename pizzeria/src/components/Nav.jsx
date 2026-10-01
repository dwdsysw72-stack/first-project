import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Icon from './Icon.jsx';
import BrandMark from './BrandMark.jsx';
import { EASE_OUT, tap } from './motion.js';

export const NAV_ITEMS = [
  { href: '#menu', label: 'תפריט' },
  { href: '#oven', label: 'התנור' },
  { href: '#reviews', label: 'ביקורות' },
  { href: '#visit', label: 'ביקור ומשלוח' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  // Border + shadow appear once content scrolls under the bar (state change, not per-frame).
  useMotionValueEvent(scrollY, 'change', (y) => setStuck(y > 8));

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}`}>
      <div className="wrap nav-row">
        <a className="brand" href="#top" aria-label="תנור, לראש העמוד">
          <BrandMark />
          <span className="brand-name">תנור</span>
        </a>
        <nav className="nav-links" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-end">
          <motion.a className="btn btn-primary" href="#visit" whileTap={tap}>להזמנה</motion.a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobileMenu"
            aria-label="תפריט ניווט"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'x' : 'list'} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobileMenu"
            className="mobile-menu"
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}><a href={item.href} onClick={() => setOpen(false)}>{item.label}</a></li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
