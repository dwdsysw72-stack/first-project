import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Photo from './Photo.jsx';
import { revealProps } from './motion.js';

const PIZZAS = [
  { name: 'Margherita', price: 16, desc: 'San Marzano tomatoes, fior di latte, fresh basil and olive oil.', tag: 'Best Seller', photo: '1574071318508-1cdbab80d002', alt: 'Margherita pizza' },
  { name: 'Hot Pepperoni', price: 20, desc: 'Spicy cup-and-char pepperoni, mozzarella and our house-made hot honey.', tag: 'Spicy', photo: '1628840042765-356cda07504e', alt: 'Pepperoni pizza' },
  { name: 'Mushroom Bianca', price: 19, desc: 'Cream base, wild mushrooms, thyme and shaved Parmesan.', photo: '1565299624946-b28f40a0ae38', alt: 'Pizza with vegetables' },
  { name: 'The Green One', price: 18, desc: 'Basil pesto, zucchini, ricotta and lemon zest.', tag: 'Vegetarian', photo: '1593560708920-61dd98c46a4e', alt: 'Green pizza' },
  { name: 'Four Cheese', price: 19, desc: 'Mozzarella, Gorgonzola, Parmesan and Pecorino, finished with cracked black pepper.', photo: '1604382354936-07c5d9983bd3', alt: 'Four cheese pizza' },
  { name: 'Marinara', price: 14, desc: 'Tomatoes, sliced garlic, oregano and olive oil. No cheese.', tag: 'Vegan', photo: '1590947132387-155cc02f3212', alt: 'Marinara pizza' },
];

const DESKTOP = '(min-width: 1024px)';

// On desktop the section pins and vertical scroll pans the menu sideways, like walking
// past the counter. On mobile (or with reduced motion) it's a native swipeable row.
export default function Menu() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (reduce) { setDistance(0); return; }
    const mq = window.matchMedia(DESKTOP);
    const measure = () => {
      const track = trackRef.current;
      setDistance(mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); mq.removeEventListener('change', measure); window.removeEventListener('resize', measure); };
  }, [reduce]);

  const panning = distance > 0;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // LTR: extra cards overflow to the right, so the track moves left (negative x).
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      className={`section menu-section${panning ? ' is-panning' : ''}`}
      id="menu"
      aria-labelledby="menuTitle"
      style={panning ? { height: `calc(100dvh + ${distance}px)` } : undefined}
    >
      <div className="menu-pin">
        <div className="wrap menu-head">
          <motion.h2 className="section-title" id="menuTitle" {...revealProps()}>The Menu</motion.h2>
          <motion.p className="section-lead" {...revealProps(0.08)}>
            Six pizzas, no shortcuts. Every pie is 12 inches and comes straight out of the oven.
          </motion.p>
        </div>
        <div className="menu-viewport">
          <motion.ul className="menu-track" ref={trackRef} style={{ x: panning ? x : 0 }}>
            {PIZZAS.map((p, i) => (
              <motion.li key={p.name} className="pizza-card" {...revealProps(Math.min(i, 3) * 0.06)}>
                <Photo id={p.photo} w={760} h={570} alt={p.alt} />
                <div className="pizza-body">
                  <div className="pizza-top">
                    <h3 className="pizza-name">{p.name}</h3>
                    <span className="pizza-price">${p.price}</span>
                  </div>
                  <p className="pizza-desc">{p.desc}</p>
                  {p.tag && <span className="chip">{p.tag}</span>}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <p className="wrap menu-hint">Swipe for more pizzas</p>
      </div>
    </section>
  );
}
