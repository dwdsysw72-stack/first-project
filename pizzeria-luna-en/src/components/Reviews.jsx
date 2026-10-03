import { useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps } from './motion.js';

// Sample reviews: replace with real ones before going live.
const REVIEWS = [
  { text: 'We walked in at 1 AM and the pizza was perfect. That crust is unreal.', name: 'Jenna Kowalski', role: 'Late-night regular' },
  { text: 'The Diavola with hot honey is the best thing I ate all month.', name: 'Marcus Delgado', role: 'Ordered delivery' },
  { text: 'Delivered in under 30 minutes and still piping hot.', name: 'Priya Raman', role: 'Weekly regular' },
  { text: "The vegan Marinara proves you don't need cheese for a great pizza.", name: 'Tom Becker', role: 'Vegan' },
];

// A row of cards you can grab and fling sideways.
export default function Reviews() {
  const constraints = useRef(null);
  return (
    <section className="section" id="reviews" aria-labelledby="reviewsTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="reviewsTitle" {...revealProps()}>What people say</motion.h2>
        <p className="drag-hint"><Icon name="hand-pointing" /> Drag the cards</p>
      </div>
      <div className="reviews-viewport" ref={constraints}>
        <motion.ul className="reviews-track" drag="x" dragConstraints={constraints} dragElastic={0.12} whileTap={{ cursor: 'grabbing' }}>
          {REVIEWS.map((r, i) => (
            <motion.li
              key={r.name}
              className="review"
              initial={{ opacity: 0, rotate: i % 2 ? 4 : -4, y: 60 }}
              whileInView={{ opacity: 1, rotate: i % 2 ? 1.5 : -1.5, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.08 }}
              whileHover={{ rotate: 0, y: -8 }}
            >
              <div className="stars" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, k) => <Icon key={k} name="star" />)}
              </div>
              <blockquote>"{r.text}"</blockquote>
              <p className="who"><strong>{r.name}</strong>, {r.role}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
