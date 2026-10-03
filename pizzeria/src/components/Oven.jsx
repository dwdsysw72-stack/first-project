import { motion } from 'framer-motion';
import Counter from './Counter.jsx';
import Photo from './Photo.jsx';
import { revealProps } from './motion.js';

export default function Oven() {
  return (
    <section className="section" id="oven" aria-labelledby="ovenTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="ovenTitle" {...revealProps()}>Inside the Oven</motion.h2>
        <div className="bento">
          <motion.div className="cell cell-photo" {...revealProps()}>
            <Photo id="1571997478779-2adcbbe9ab2f" w={900} h={1100} alt="Pizza baking in a wood-fired oven" icon="fire" />
          </motion.div>
          <motion.div className="cell cell-red" {...revealProps(0.06)}>
            <p className="cell-stat"><Counter to={48} /> hrs</p>
            <p className="cell-text">A slow rise for a light, airy crust that’s easy on your stomach.</p>
          </motion.div>
          <motion.div className="cell cell-plain" {...revealProps(0.12)}>
            <p className="cell-stat"><Counter to={850} />°F</p>
            <p className="cell-text">Blazing oak-wood heat that gives the crust those signature leopard spots.</p>
          </motion.div>
          <motion.div className="cell cell-tint cell-wide" {...revealProps(0.18)}>
            <p className="cell-stat"><Counter to={90} /> sec</p>
            <p className="cell-text">That’s it. Your pizza’s on the table, or already on its way to you.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
