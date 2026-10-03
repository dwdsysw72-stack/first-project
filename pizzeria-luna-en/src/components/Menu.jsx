import { motion } from 'framer-motion';
import Photo from './Photo.jsx';
import TiltCard from './TiltCard.jsx';
import { revealProps } from './motion.js';

const PIZZAS = [
  { name: 'Margherita', price: 16, desc: 'San Marzano tomatoes, fresh mozzarella, basil and olive oil.', tag: 'Best seller', photo: '1574071318508-1cdbab80d002', alt: 'Margherita pizza' },
  { name: 'Diavola', price: 19, desc: 'Spicy salami, mozzarella, fresh chili and hot honey.', tag: 'Spicy', photo: '1628840042765-356cda07504e', alt: 'Pizza with spicy salami' },
  { name: 'Garden', price: 18, desc: 'Roasted peppers, red onion, olives and cherry tomatoes.', tag: 'Veggie', photo: '1565299624946-b28f40a0ae38', alt: 'Vegetable pizza' },
  { name: 'Pesto Ricotta', price: 18, desc: 'Basil pesto, ricotta, zucchini and lemon zest.', photo: '1593560708920-61dd98c46a4e', alt: 'Pesto pizza' },
  { name: 'Four Cheese', price: 19, desc: 'Mozzarella, gorgonzola, parmesan and pecorino.', photo: '1604382354936-07c5d9983bd3', alt: 'Four cheese pizza' },
  { name: 'Marinara', price: 14, desc: 'Tomato, sliced garlic, oregano and olive oil. No cheese.', tag: 'Vegan', photo: '1590947132387-155cc02f3212', alt: 'Marinara pizza' },
];

// Menu as an offset two-column wall of tilt cards. Photo zooms in on hover.
export default function Menu() {
  return (
    <section className="section" id="menu" aria-labelledby="menuTitle">
      <div className="wrap">
        <motion.h2 className="section-title" id="menuTitle" {...revealProps()}>What's in the oven tonight</motion.h2>
        <ul className="menu-grid">
          {PIZZAS.map((p, i) => (
            <motion.li key={p.name} {...revealProps((i % 3) * 0.08)}>
              <TiltCard className="pizza-card">
                <div className="frame pizza-photo">
                  <Photo
                    id={p.photo}
                    w={800}
                    h={600}
                    alt={p.alt}
                    imgProps={{ variants: { hover: { scale: 1.12 } }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  />
                  {p.tag && <span className="tag">{p.tag}</span>}
                </div>
                <div className="pizza-body">
                  <h3 className="pizza-name">{p.name}</h3>
                  <p className="pizza-desc">{p.desc}</p>
                  <p className="pizza-price">${p.price}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
