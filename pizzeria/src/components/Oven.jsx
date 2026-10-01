import { motion } from 'framer-motion';
import Counter from './Counter.jsx';
import Photo from './Photo.jsx';
import { revealProps } from './motion.js';

export default function Oven() {
  return (
    <section className="section" id="oven" aria-labelledby="ovenTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="ovenTitle" {...revealProps()}>מה קורה בתנור</motion.h2>
        <div className="bento">
          <motion.div className="cell cell-photo" {...revealProps()}>
            <Photo id="1571997478779-2adcbbe9ab2f" w={900} h={1100} alt="פיצה נאפית בתנור עצים" icon="fire" />
          </motion.div>
          <motion.div className="cell cell-red" {...revealProps(0.06)}>
            <p className="cell-stat"><Counter to={48} /> שעות</p>
            <p className="cell-text">תפיחה איטית שנותנת בצק אוורירי וקל לעיכול.</p>
          </motion.div>
          <motion.div className="cell cell-plain" {...revealProps(0.12)}>
            <p className="cell-stat"><Counter to={450} />°</p>
            <p className="cell-text">חום של עצי אלון שחורך את השוליים בנקודות.</p>
          </motion.div>
          <motion.div className="cell cell-tint cell-wide" {...revealProps(0.18)}>
            <p className="cell-stat"><Counter to={90} /> שניות</p>
            <p className="cell-text">וזהו. הפיצה כבר על השולחן, או בדרך אליכם.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
