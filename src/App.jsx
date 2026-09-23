import { MotionConfig } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustStrip from './components/TrustStrip.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Gallery from './components/Gallery.jsx';
import Team from './components/Team.jsx';
import Testimonials from './components/Testimonials.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  return (
    // reducedMotion="user" drops transform animations for visitors with prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:bg-gold focus:text-ink focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold">
        דלג לתוכן הראשי
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Team />
        <Testimonials />
        <CtaBanner />
        <Booking />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
