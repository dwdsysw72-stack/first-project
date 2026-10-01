import { motion } from 'framer-motion';
import { EASE_OUT } from './motion.js';

const letter = {
  hidden: { opacity: 0, y: '0.7em', rotate: 8 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Headline that types itself in letter by letter. Screen readers get the plain text once.
export default function SplitText({ lines, as: Tag = 'h1', className, delay = 0, stagger = 0.035 }) {
  const text = lines.map((l) => l.map((p) => p.text).join('')).join(' ');
  let i = 0;
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        style={{ display: 'block' }}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {lines.map((parts, li) => (
          <span key={li} className="split-line">
            {parts.map((part, pi) =>
              part.text.split(' ').map((word, wi, words) => (
                <span key={`${pi}-${wi}`} className={`split-word${part.accent ? ' accent' : ''}`}>
                  {Array.from(word).map((ch) => {
                    i += 1;
                    return <motion.span key={i} className="split-char" variants={letter}>{ch}</motion.span>;
                  })}
                  {wi < words.length - 1 ? ' ' : ''}
                </span>
              )),
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
