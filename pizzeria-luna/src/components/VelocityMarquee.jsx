import { useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion';
import Icon from './Icon.jsx';
import { useRichMotion } from './motion.js';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// The page's single marquee. It drifts on its own, speeds up with scroll speed,
// and flips direction when you scroll back up.
export default function VelocityMarquee({ words, baseVelocity = 3 }) {
  const rich = useRichMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(0, 50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!rich) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const group = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="marquee-item"><span>{w}</span><Icon name="pizza" /></span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label={words.join(', ')}>
      <motion.div className="marquee-track" style={{ x }}>
        {group(false)}
        {group(true)}
      </motion.div>
    </div>
  );
}
