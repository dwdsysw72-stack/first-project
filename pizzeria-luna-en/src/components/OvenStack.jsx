import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Counter from './Counter.jsx';
import ParallaxPhoto from './ParallaxPhoto.jsx';
import { useRichMotion } from './motion.js';

const STEPS = [
  { n: 48, unit: 'hours', title: 'The dough rests', text: 'A slow, cold sourdough rise. The result is a light, airy crust.', photo: '1571997478779-2adcbbe9ab2f', tone: 'orange' },
  { n: 840, unit: '°F', title: 'The oven roars', text: 'Oak wood in a brick oven. The crust puffs up and chars in spots.', photo: '1574071318508-1cdbab80d002', tone: 'ink' },
  { n: 90, unit: 'seconds', title: "And it's ready", text: 'From the oven to your table or the box, in the time it takes to pick a drink.', photo: '1513104890138-7c749659a591', tone: 'cream' },
];

function StackCard({ step, i, total, progress, rich }) {
  // Each card shrinks and dims a little as the next one slides over it.
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.05]);
  const filter = useTransform(progress, [start, 1], ['brightness(1)', `brightness(${1 - (total - i - 1) * 0.12})`]);
  return (
    <div className="stack-slot" style={{ top: `calc(var(--nav-h) + 24px + ${i * 28}px)` }}>
      <motion.article className={`stack-card tone-${step.tone}`} style={rich ? { scale, filter } : undefined}>
        <div className="stack-copy">
          <p className="stack-stat"><Counter to={step.n} />{step.unit.startsWith('°') ? '' : ' '}{step.unit}</p>
          <h3 className="stack-title">{step.title}</h3>
          <p className="stack-text">{step.text}</p>
        </div>
        <ParallaxPhoto className="stack-photo" id={step.photo} w={900} h={900} alt="" icon="fire" />
      </motion.article>
    </div>
  );
}

// Sticky stack: the three oven facts pile on top of each other as you scroll.
export default function OvenStack() {
  const ref = useRef(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="section oven" id="oven" aria-labelledby="ovenTitle">
      <div className="wrap">
        <h2 className="section-title" id="ovenTitle">How it's made</h2>
        <div className="stack" ref={ref}>
          {STEPS.map((s, i) => (
            <StackCard key={s.title} step={s} i={i} total={STEPS.length} progress={scrollYProgress} rich={rich} />
          ))}
        </div>
      </div>
    </section>
  );
}
