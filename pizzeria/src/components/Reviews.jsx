import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps } from './motion.js';

// Sample reviews: replace with real ones before going live.
const REVIEWS = [
  { text: 'Lightest crust I’ve had outside of Naples. The Margherita is just perfect.', name: 'Jake Morrison', role: 'Regular', feature: true },
  { text: 'We ordered delivery on a Friday night and it showed up piping hot with a crispy crust.', name: 'Emily Carter', role: 'Ordered delivery' },
  { text: 'A real neighborhood pizza joint. The Mushroom Bianca is a must.', name: 'Ryan Brooks', role: 'Lives down the block' },
];

function Stars() {
  return (
    <div className="stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" />)}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section" id="reviews" aria-labelledby="reviewsTitle" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <motion.h2 className="section-title" id="reviewsTitle" {...revealProps()}>What People Are Saying</motion.h2>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <motion.figure key={r.name} className={`quote ${r.feature ? 'quote-feature' : 'quote-small'}`} {...revealProps(i * 0.08)}>
              <Stars />
              <blockquote><p>"{r.text}"</p></blockquote>
              <figcaption className="who"><strong>{r.name}</strong><span>{r.role}</span></figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
