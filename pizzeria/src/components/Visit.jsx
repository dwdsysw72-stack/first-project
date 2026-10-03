import { motion } from 'framer-motion';
import Icon from './Icon.jsx';
import { revealProps, tap } from './motion.js';

// Placeholders: replace phone number and address before going live.
const PHONE_HREF = 'tel:+12125550148';

export default function Visit() {
  return (
    <section className="section visit" id="visit" aria-labelledby="visitTitle">
      <div className="wrap visit-grid">
        <motion.div className="visit-cta" {...revealProps()}>
          <h2 className="section-title" id="visitTitle">Hungry? We’ve got you.</h2>
          <p className="section-lead">Call ahead and pick up in 15 minutes, or get it delivered hot anywhere within 3 miles.</p>
          <div>
            <motion.a className="btn btn-primary" href={PHONE_HREF} whileTap={tap} whileHover={{ y: -2 }}>
              <Icon name="phone" />
              Call to Order
            </motion.a>
          </div>
          <p className="alt">Rather text? <a href="sms:+12125550148">Send us a text</a></p>
        </motion.div>

        <motion.div className="info" {...revealProps(0.1)}>
          <div className="info-row">
            <Icon name="map-pin" />
            <div><h3>Address</h3><p>148 Bleecker St, New York, NY 10012</p></div>
          </div>
          <div className="info-row">
            <Icon name="clock" />
            <div>
              <h3>Hours</h3>
              <dl className="hours">
                <dt>Mon – Thu</dt><dd>11:30 AM – 10 PM</dd>
                <dt>Fri – Sat</dt><dd>11:30 AM – 12 AM</dd>
                <dt>Sunday</dt><dd>12 PM – 9 PM</dd>
              </dl>
            </div>
          </div>
          <div className="info-row">
            <Icon name="moped" />
            <div><h3>Delivery</h3><p>Up to 3 miles, usually in about 35 minutes.</p></div>
          </div>
          <div className="info-row">
            <Icon name="phone" />
            <div><h3>Phone</h3><p><a href={PHONE_HREF}>(212) 555-0148</a></p></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
