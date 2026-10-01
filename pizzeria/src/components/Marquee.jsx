import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon.jsx';

const WORDS = ['בצק מחמצת', 'עגבניות סן מרצנו', 'פיור די לאטה', 'בזיליקום טרי', 'שמן זית כתית', 'עצי אלון'];

function Group({ hidden }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {WORDS.map((w) => (
        <span key={w} style={{ display: 'contents' }}>
          <span>{w}</span>
          <Icon name="pizza" />
        </span>
      ))}
    </div>
  );
}

// The page's single marquee: lists what goes into every pizza without taking a whole section.
export default function Marquee() {
  const reduce = useReducedMotion();
  return (
    <div className="marquee" aria-label="המרכיבים שלנו">
      <motion.div
        className="marquee-track"
        style={{ animation: 'none' }}
        animate={reduce ? undefined : { x: ['0%', '50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        <Group />
        <Group hidden />
      </motion.div>
    </div>
  );
}
