import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const format = (n) => Math.round(n).toLocaleString('en-US');

export default function Counter({ to, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (reduceMotion) {
      el.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.33, 1, 0.68, 1], // easeOutCubic
      onUpdate: (v) => { el.textContent = format(v); },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  return <span ref={ref}>0</span>;
}
