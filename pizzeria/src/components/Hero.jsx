import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Icon from './Icon.jsx';
import Photo from './Photo.jsx';
import { EASE_OUT, tap } from './motion.js';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: '0.6em' }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } } };

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The pizza turns as you scroll past the hero, like it's being spun on the peel.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="wrap hero-grid">
        <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
          <h1 className="hero-title">
            <span className="line"><motion.span variants={rise}>פיצה מתנור עצים,</motion.span></span>
            <span className="line"><motion.span variants={rise}>מוכנה תוך <em>90 שניות.</em></motion.span></span>
          </h1>
          <motion.p className="hero-sub" variants={rise}>
            בצק שמתפח 48 שעות, עגבניות סן מרצנו ומוצרלה טרייה. אוכלים אצלנו או מקבלים חם הביתה.
          </motion.p>
          <motion.div className="hero-ctas" variants={rise}>
            <motion.a className="btn btn-primary" href="#visit" whileTap={tap}>להזמנה</motion.a>
            <motion.a className="btn btn-ghost" href="#menu" whileTap={tap}>לתפריט</motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.9, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.15 }}
        >
          <div className="hero-plate" />
          <motion.div className="hero-pizza" style={{ rotate }}>
            <Photo id="1513104890138-7c749659a591" w={1100} h={1100} alt="פיצה מרגריטה טרייה מלמעלה" className="photo" priority />
          </motion.div>
          <motion.p
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
          >
            <Icon name="fire" />
            <span>תנור עצים, 450 מעלות</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
