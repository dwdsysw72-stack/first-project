import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps } from './motion.js';

// Sample reviews: replace with real ones before going live.
const REVIEWS = [
  { text: 'הבצק הכי קליל שאכלתי מחוץ לנאפולי. המרגריטה פשוט מדויקת.', name: 'יואב אלמוג', role: 'סועד קבוע', feature: true },
  { text: 'הזמנו משלוח ביום שישי והפיצה הגיעה חמה לגמרי, עם שוליים פריכים.', name: 'מאיה רוזנטל', role: 'הזמינה משלוח' },
  { text: 'פיצרייה שכונתית אמיתית. הביאנקה עם הפטריות היא חובה.', name: 'עידו שטרן', role: 'גר ברחוב ליד' },
];

function Stars() {
  return (
    <div className="stars" role="img" aria-label="5 מתוך 5 כוכבים">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" />)}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section" id="reviews" aria-labelledby="reviewsTitle" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <motion.h2 className="section-title" id="reviewsTitle" {...revealProps()}>מה אומרים עלינו</motion.h2>
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
