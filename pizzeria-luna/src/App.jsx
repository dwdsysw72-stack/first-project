import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import VelocityMarquee from './components/VelocityMarquee.jsx';
import Menu from './components/Menu.jsx';
import OvenStack from './components/OvenStack.jsx';
import Gallery from './components/Gallery.jsx';
import Reviews from './components/Reviews.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';
import { usePointer } from './components/motion.js';

const MARQUEE = ['בצק מחמצת', 'תנור עצים', 'עגבניות סן מרצנו', 'פיור די לאטה', 'בזיליקום טרי', 'פתוח עד 2:00'];

export default function App() {
  const pointer = usePointer();
  return (
    // reducedMotion="user" + useReducedMotion checks: visitors who ask for less motion get a still page.
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">דלגו לתוכן</a>
      <Nav />
      <main id="main">
        <Hero pointer={pointer} />
        <VelocityMarquee words={MARQUEE} />
        <Menu />
        <OvenStack />
        <Gallery />
        <Reviews />
        <Visit pointer={pointer} />
      </main>
      <Footer />
    </MotionConfig>
  );
}
