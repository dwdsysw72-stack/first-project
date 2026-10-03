import { useEffect, useState } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1];
export const SPRING = { type: 'spring', stiffness: 100, damping: 20 };

export const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});

// True only on devices with a real mouse; hover/tilt/magnet effects are skipped on touch.
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}

// Whether "heavy" motion (loops, tilt, parallax, magnets) should run at all.
export function useRichMotion() {
  const reduce = useReducedMotion();
  return !reduce;
}

// Page-wide pointer position, normalised to -1..1 and smoothed with a spring.
// Lives in motion values, so moving the mouse never re-renders React.
export function usePointer() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY]);
  return { x, y };
}
