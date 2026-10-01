import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Photo from './Photo.jsx';
import { useRichMotion } from './motion.js';

const COLUMNS = [
  ['1513104890138-7c749659a591', '1604382354936-07c5d9983bd3', '1565299624946-b28f40a0ae38'],
  ['1571997478779-2adcbbe9ab2f', '1574071318508-1cdbab80d002', '1590947132387-155cc02f3212'],
  ['1628840042765-356cda07504e', '1593560708920-61dd98c46a4e', '1555396273-367ea4eb4db5'],
];

function Column({ ids, y, rich }) {
  return (
    <motion.div className="gallery-col" style={rich ? { y } : undefined}>
      {ids.map((id) => (
        <motion.div key={id} className="frame gallery-item" whileHover={{ scale: 1.03, rotate: -1 }}>
          <Photo id={id} w={700} h={860} alt="" />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Three photo columns scrolling at different speeds: the classic parallax wall.
export default function Gallery() {
  const ref = useRef(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-120, 160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -260]);
  return (
    <section className="section gallery" id="gallery" aria-labelledby="galleryTitle" ref={ref}>
      <div className="wrap">
        <h2 className="section-title on-dark" id="galleryTitle">ככה זה נראה אצלנו</h2>
        <div className="gallery-grid">
          <Column ids={COLUMNS[0]} y={y1} rich={rich} />
          <Column ids={COLUMNS[1]} y={y2} rich={rich} />
          <Column ids={COLUMNS[2]} y={y3} rich={rich} />
        </div>
      </div>
    </section>
  );
}
