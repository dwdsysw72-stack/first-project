import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from './motion.js';

// Counts up once when scrolled into view: pulls the eye to the number the block is about.
export default function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.4, ease: EASE_OUT, onUpdate: (v) => { el.textContent = Math.round(v); } });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{to}</span>;
}
