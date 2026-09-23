import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';

// Scroll-revealed card that lifts on hover. The lift lives on an inner element so its
// quick hover transition doesn't inherit the reveal's duration/stagger delay.
export default function LiftCard({ delay, className = '', children }) {
  return (
    <Reveal delay={delay} className="h-full">
      <motion.div
        className={`card-hover h-full ${className}`}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </Reveal>
  );
}
