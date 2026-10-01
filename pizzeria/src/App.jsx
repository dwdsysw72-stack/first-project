import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Menu from './components/Menu.jsx';
import Oven from './components/Oven.jsx';
import Reviews from './components/Reviews.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    // reducedMotion="user": visitors with prefers-reduced-motion get fades only, no movement.
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">דלגו לתוכן</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Menu />
        <Oven />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </MotionConfig>
  );
}
