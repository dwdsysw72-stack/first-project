import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useRichMotion } from './motion.js';

// A link/button that leans toward the cursor and springs back: feedback that it's clickable.
export default function Magnetic({ strength = 0.35, className, children, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const rich = useRichMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 15, mass: 0.4 });
  const active = fine && rich;

  const onMove = (e) => {
    if (!active) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      className={className}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
