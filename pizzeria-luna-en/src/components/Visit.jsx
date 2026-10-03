import { motion } from 'framer-motion';
import FloatingIngredients from './FloatingIngredients.jsx';
import Icon from './Icon.jsx';
import Magnetic from './Magnetic.jsx';
import { revealProps } from './motion.js';
import { useRef } from 'react';

// Placeholders: replace phone and address before going live. 555-01xx numbers are reserved for fiction.
const PHONE_HREF = 'tel:+13125550147';
const SMS_HREF = 'sms:+13125550147';

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
            <h2 className="section-title" id="visitTitle">Hungry? We're up.</h2>
            <p className="visit-lead">Call ahead and pick up in 15 minutes, or get it delivered hot within 3 miles.</p>
            <div className="visit-ctas">
              <Magnetic className="btn btn-dark" href={PHONE_HREF} strength={0.5}>
                <Icon name="phone" /> Order now
              </Magnetic>
              <a className="visit-alt" href={SMS_HREF}>Or text us</a>
            </div>
          </div>
          <dl className="visit-info">
            <div><dt><Icon name="map-pin" /> Address</dt><dd>1847 N Milwaukee Ave, Chicago, IL 60647</dd></div>
            <div><dt><Icon name="clock" /> Hours</dt><dd>Open daily, 6 PM to 2 AM</dd></div>
            <div><dt><Icon name="moped" /> Delivery</dt><dd>Within 3 miles, about 30 minutes</dd></div>
            <div><dt><Icon name="phone" /> Phone</dt><dd><a href={PHONE_HREF}>(312) 555-0147</a></dd></div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
