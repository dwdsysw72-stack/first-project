import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Photo from './Photo.jsx';
import { useRichMotion } from './motion.js';

// The photo drifts inside its frame as the frame scrolls past: adds depth without moving layout.
export default function ParallaxPhoto({ className = '', range = 14, ...photo }) {
  const ref = useRef(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div ref={ref} className={`frame ${className}`}>
      <Photo {...photo} style={rich ? { y, scale: 1 + (range * 2.4) / 100 } : undefined} />
    </div>
  );
}
