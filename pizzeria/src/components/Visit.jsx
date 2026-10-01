import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps, tap } from './motion.js';

// Placeholders: replace phone, WhatsApp number and address before going live.
const PHONE_HREF = 'tel:+97230000000';

export default function Visit() {
  return (
    <section className="section visit" id="visit" aria-labelledby="visitTitle">
      <div className="wrap visit-grid">
        <motion.div className="visit-cta" {...revealProps()}>
          <h2 className="section-title" id="visitTitle">רעבים? אנחנו כאן.</h2>
          <p className="section-lead">מזמינים בטלפון ואוספים תוך רבע שעה, או מקבלים משלוח חם עד 5 ק"מ מהתנור.</p>
          <div>
            <motion.a className="btn btn-primary" href={PHONE_HREF} whileTap={tap} whileHover={{ y: -2 }}>
              <Icon name="phone" />
              להזמנה
            </motion.a>
          </div>
          <p className="alt">מעדיפים הודעה? <a href="https://wa.me/972300000000" target="_blank" rel="noopener">כתבו לנו בוואטסאפ</a></p>
        </motion.div>

        <motion.div className="info" {...revealProps(0.1)}>
          <div className="info-row">
            <Icon name="map-pin" />
            <div><h3>כתובת</h3><p>רחוב יפו 48, ירושלים</p></div>
          </div>
          <div className="info-row">
            <Icon name="clock" />
            <div>
              <h3>שעות פתיחה</h3>
              <dl className="hours">
                <dt>ראשון עד חמישי</dt><dd>12:00-23:00</dd>
                <dt>שישי</dt><dd>12:00-16:00</dd>
                <dt>מוצאי שבת</dt><dd>20:00-01:00</dd>
              </dl>
            </div>
          </div>
          <div className="info-row">
            <Icon name="moped" />
            <div><h3>משלוחים</h3><p>עד 5 ק"מ, בדרך כלל תוך 35 דקות.</p></div>
          </div>
          <div className="info-row">
            <Icon name="phone" />
            <div><h3>טלפון</h3><p><a href={PHONE_HREF} dir="ltr">03-000-0000</a></p></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
