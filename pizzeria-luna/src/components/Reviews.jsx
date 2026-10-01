import { useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps } from './motion.js';

// Sample reviews: replace with real ones before going live.
const REVIEWS = [
  { text: 'הגענו באחת בלילה והפיצה הייתה מושלמת. השוליים פשוט מעולים.', name: 'רוני אברבנאל', role: 'סועד לילי' },
  { text: 'הדיאבולה עם הדבש היא הדבר הכי טוב שאכלתי החודש.', name: 'שירה גולדמן', role: 'הזמינה משלוח' },
  { text: 'משלוח תוך חצי שעה, והפיצה הגיעה חמה לגמרי.', name: 'אלון פרידמן', role: 'לקוח קבוע' },
  { text: 'המרינרה הטבעונית מוכיחה שלא צריך גבינה בשביל פיצה מעולה.', name: 'נטע כהן', role: 'טבעונית' },
];

// A row of cards you can grab and fling sideways.
export default function Reviews() {
  const constraints = useRef(null);
  return (
    <section className="section" id="reviews" aria-labelledby="reviewsTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="reviewsTitle" {...revealProps()}>אומרים עלינו</motion.h2>
        <p className="drag-hint"><Icon name="hand-pointing" /> גררו את הכרטיסים</p>
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
              <div className="stars" role="img" aria-label="5 מתוך 5 כוכבים">
                {Array.from({ length: 5 }, (_, k) => <Icon key={k} name="star" />)}
              </div>
              <blockquote>"{r.text}"</blockquote>
              <p className="who"><strong>{r.name}</strong> {r.role}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
