import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingIngredients from './FloatingIngredients.jsx';
import Magnetic from './Magnetic.jsx';
import Photo from './Photo.jsx';
import SplitText from './SplitText.jsx';
import Icon from './Icon.jsx';
import { EASE_OUT, useRichMotion } from './motion.js';

export default function Hero({ pointer }) {
  const ref = useRef(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Layers move at different speeds as you leave the hero (parallax depth).
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const spinBoost = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const tiltX = useTransform(pointer.x, (v) => v * -8);
  const tiltY = useTransform(pointer.y, (v) => v * 8);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={rich ? { y: copyY } : undefined}>
          <SplitText
            className="hero-title"
            delay={0.15}
            lines={[[{ text: 'פיצה שמסתובבת' }], [{ text: 'כל הלילה.', accent: true }]]}
          />
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE_OUT }}
          >
            בצק מחמצת, תנור עצים לוהט ותוספות טריות. פתוחים עד 2 בלילה, גם במשלוח.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: EASE_OUT }}
          >
            <Magnetic className="btn btn-primary" href="#visit">
              להזמנה <Icon name="arrow-left" />
            </Magnetic>
            <Magnetic className="btn btn-ghost" href="#menu">לתפריט</Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero-art" style={rich ? { y: artY } : undefined}>
          <motion.div
            className="hero-stage"
            style={rich ? { rotateX: tiltY, rotateY: tiltX, transformPerspective: 1000 } : undefined}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.2 }}
          >
            <div className="hero-plate" />
            {/* Outer layer: extra spin from scrolling. Inner layer: never stops turning. */}
            <motion.div className="hero-pizza" style={rich ? { rotate: spinBoost } : undefined}>
              <motion.div
                className="hero-pizza-inner"
                animate={rich ? { rotate: 360 } : undefined}
                transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              >
                <Photo id="1513104890138-7c749659a591" w={1100} h={1100} alt="פיצה מרגריטה טרייה מלמעלה" priority />
              </motion.div>
            </motion.div>
            <FloatingIngredients pointer={pointer} target={ref} />
          </motion.div>
          <motion.p
            className="hero-sticker"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 1.2 }}
            whileHover={{ rotate: 6, scale: 1.08 }}
          >
            עד 2:00<br />בלילה
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
