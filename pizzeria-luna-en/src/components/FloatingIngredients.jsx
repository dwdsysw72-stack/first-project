import { motion, useScroll, useTransform } from 'framer-motion';
import Icon from './Icon.jsx';
import { useRichMotion } from './motion.js';

// Ingredients orbit the pizza: each bobs on its own loop, shifts with the mouse
// (deeper = moves more) and drifts with scroll. Purely decorative.
const DEFAULT_ITEMS = [
  { icon: 'leaf', top: '6%', left: '10%', size: 64, depth: 40, color: 'var(--basil)', rot: -20, dur: 6 },
  { icon: 'orange-slice', top: '2%', left: '68%', size: 58, depth: 25, color: 'var(--tomato)', rot: 15, dur: 7 },
  { icon: 'pepper', top: '72%', left: '4%', size: 54, depth: 55, color: 'var(--tomato)', rot: 30, dur: 5.5 },
  { icon: 'cheese', top: '80%', left: '74%', size: 66, depth: 35, color: 'var(--cheese)', rot: -10, dur: 6.5 },
  { icon: 'leaf', top: '40%', left: '90%', size: 44, depth: 60, color: 'var(--basil)', rot: 40, dur: 5 },
  { icon: 'drop', top: '44%', left: '-4%', size: 36, depth: 70, color: 'var(--cheese)', rot: 0, dur: 4.5 },
];

function Ingredient({ item, pointer, scrollYProgress, rich }) {
  const px = useTransform(pointer.x, (v) => v * item.depth);
  const py = useTransform(pointer.y, (v) => v * item.depth);
  const sy = useTransform(scrollYProgress, [0, 1], [0, -item.depth * 6]);
  const y = useTransform([py, sy], ([a, b]) => a + b);
  return (
    <motion.span
      className="ingredient"
      style={{ top: item.top, left: item.left, width: item.size, height: item.size, color: item.color, ...(rich ? { x: px, y } : {}) }}
      aria-hidden="true"
    >
      <motion.span
        style={{ display: 'block', width: '100%', height: '100%' }}
        initial={{ rotate: item.rot }}
        animate={rich ? { y: [0, -14, 0], rotate: [item.rot, item.rot + 18, item.rot] } : undefined}
        transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon name={item.icon} className="icon icon-fill" />
      </motion.span>
    </motion.span>
  );
}

export default function FloatingIngredients({ pointer, target, items = DEFAULT_ITEMS }) {
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] });
  return (
    <div className="ingredients">
      {items.map((item, i) => (
        <Ingredient key={i} item={item} pointer={pointer} scrollYProgress={scrollYProgress} rich={rich} />
      ))}
    </div>
  );
}
