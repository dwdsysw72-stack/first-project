import { motion } from 'framer-motion';
import Photo from './Photo.jsx';
import TiltCard from './TiltCard.jsx';
import { revealProps } from './motion.js';

const PIZZAS = [
  { name: 'מרגריטה', price: 52, desc: 'עגבניות סן מרצנו, פיור די לאטה, בזיליקום ושמן זית.', tag: 'הכי נמכרת', photo: '1574071318508-1cdbab80d002', alt: 'פיצה מרגריטה' },
  { name: 'דיאבולה', price: 67, desc: "סלמי חריף, מוצרלה, צ'ילי טרי ודבש.", tag: 'חריפה', photo: '1628840042765-356cda07504e', alt: 'פיצה עם סלמי חריף' },
  { name: 'ירקות הגינה', price: 61, desc: 'פלפלים קלויים, בצל סגול, זיתים ועגבניות שרי.', tag: 'צמחונית', photo: '1565299624946-b28f40a0ae38', alt: 'פיצה עם ירקות' },
  { name: 'פסטו וריקוטה', price: 63, desc: 'פסטו בזיליקום, ריקוטה, קישואים וגרידת לימון.', photo: '1593560708920-61dd98c46a4e', alt: 'פיצה ירוקה' },
  { name: 'ארבע גבינות', price: 65, desc: 'מוצרלה, גורגונזולה, פרמזן ופקורינו.', photo: '1604382354936-07c5d9983bd3', alt: 'פיצה עם גבינות' },
  { name: 'מרינרה', price: 44, desc: 'עגבניות, שום פרוס, אורגנו ושמן זית. בלי גבינה.', tag: 'טבעונית', photo: '1590947132387-155cc02f3212', alt: 'פיצה מרינרה' },
];

// Menu as an offset two-column wall of tilt cards. Photo zooms in on hover.
export default function Menu() {
  return (
    <section className="section" id="menu" aria-labelledby="menuTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="menuTitle" {...revealProps()}>מה בתנור הלילה</motion.h2>
        <ul className="menu-grid">
          {PIZZAS.map((p, i) => (
            <motion.li key={p.name} {...revealProps((i % 3) * 0.08)}>
              <TiltCard className="pizza-card">
                <div className="frame pizza-photo">
                  <Photo
                    id={p.photo}
                    w={800}
                    h={600}
                    alt={p.alt}
                    imgProps={{ variants: { hover: { scale: 1.12 } }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  />
                  {p.tag && <span className="tag">{p.tag}</span>}
                </div>
                <div className="pizza-body">
                  <h3 className="pizza-name">{p.name}</h3>
                  <p className="pizza-desc">{p.desc}</p>
                  <p className="pizza-price">₪{p.price}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
