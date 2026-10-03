import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer, useRichMotion } from './motion.js';

// 3D tilt that follows the cursor, plus a moving glare. Tells you the card is "picked up".
export default function TiltCard({ className = '', children, max = 10, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const rich = useRichMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(sy, [0, 1], ['0%', '100%']);
  const glare = useTransform([glareX, glareY], ([gx, gy]) =>
    `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`);
  const active = fine && rich;

  const onMove = (e) => {
    if (!active) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={active ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={active ? 'hover' : undefined}
      {...rest}
    >
      {children}
      {active && <motion.span className="glare" style={{ background: glare }} aria-hidden="true" />}
    </motion.div>
  );
}
