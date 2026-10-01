import { motion } from 'framer-motion';
import FloatingIngredients from './FloatingIngredients.jsx';
import Icon from './Icon.jsx';
import Magnetic from './Magnetic.jsx';
import { revealProps } from './motion.js';
import { useRef } from 'react';

// Placeholders: replace phone, WhatsApp number and address before going live.
const PHONE_HREF = 'tel:+97230000000';

const SIDE_ITEMS = [
  { icon: 'leaf', top: '-3%', left: '44%', size: 56, depth: 30, color: 'var(--basil)', rot: -20, dur: 6 },
  { icon: 'pepper', top: '86%', left: '50%', size: 48, depth: 45, color: 'var(--ink)', rot: 20, dur: 5 },
  { icon: 'cheese', top: '84%', left: '2%', size: 60, depth: 35, color: 'var(--cream)', rot: 10, dur: 7 },
];

export default function Visit({ pointer }) {
  const ref = useRef(null);
  return (
    <section className="section visit-wrap" id="visit" aria-labelledby="visitTitle">
      <div className="wrap">
        <motion.div className="visit" ref={ref} {...revealProps()}>
          <FloatingIngredients pointer={pointer} target={ref} items={SIDE_ITEMS} />
          <div className="visit-main">
            <h2 className="section-title" id="visitTitle">רעבים? אנחנו ערים.</h2>
            <p className="visit-lead">מזמינים בטלפון ואוספים תוך רבע שעה, או מקבלים משלוח חם עד 5 ק"מ.</p>
            <div className="visit-ctas">
              <Magnetic className="btn btn-dark" href={PHONE_HREF} strength={0.5}>
                <Icon name="phone" /> להזמנה
              </Magnetic>
              <a className="visit-alt" href="https://wa.me/972300000000" target="_blank" rel="noopener">או כתבו לנו בוואטסאפ</a>
            </div>
          </div>
          <dl className="visit-info">
            <div><dt><Icon name="map-pin" /> כתובת</dt><dd>רחוב הרצל 21, חיפה</dd></div>
            <div><dt><Icon name="clock" /> שעות</dt><dd>כל יום 18:00-02:00</dd></div>
            <div><dt><Icon name="moped" /> משלוחים</dt><dd>עד 5 ק"מ, בערך 30 דקות</dd></div>
            <div><dt><Icon name="phone" /> טלפון</dt><dd><a href={PHONE_HREF} dir="ltr">03-000-0000</a></dd></div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
