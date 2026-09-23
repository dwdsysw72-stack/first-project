import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Counter from './Counter.jsx';
import { FiveStars, StarIcon } from './icons.jsx';

const STATS = [
  { label: 'שנות ניסיון', value: <><Counter to={12} />+</> },
  { label: 'לקוחות מרוצים', value: <><Counter to={15000} />+</> },
  { label: 'ברברים מומחים', value: <Counter to={6} /> },
  { label: 'דירוג ממוצע', value: '4.9' },
];

const float = (distance, duration) => ({
  animate: { y: [0, distance, 0], x: [0, -distance / 2, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-gold/10 blur-[110px]" {...float(40, 14)} />
        <motion.div className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-gold-dark/20 blur-[110px]" {...float(-30, 18)} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="#D9B25B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-12 gap-12 items-center py-16">
        <Reveal className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 border border-hair rounded-full px-4 py-1.5 mb-7 text-xs tracking-widest text-gold-light font-semibold">
            <StarIcon className="w-3.5 h-3.5" />
            <span>מספרת בוטיק · מאז 2012</span>
          </div>

          <h1 className="font-serif leading-[1.08] text-5xl sm:text-6xl xl:text-7xl text-ivory">
            האומנות<br />
            שמאחורי<br />
            <span className="text-gradient-gold">כל תספורת.</span>
          </h1>

          <p className="mt-7 text-lg text-muted max-w-xl leading-relaxed">
            NOIR היא מספרת יוקרה לגבר המודרני — שילוב של דיוק אומנותי, חומרי גלם פרימיום
            ואווירה שמזמינה אתכם לשבת, להירגע וליהנות מהתהליך. לא רק תספורת — חוויה.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#booking" className="btn-shine inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-4 rounded-full shadow-gold transition-colors duration-200 cursor-pointer">
              קביעת תור עכשיו
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7M3 12h18" /></svg>
            </a>
            <a href="#services" className="inline-flex items-center gap-2 border border-hair hover:border-gold-light text-ivory font-semibold px-8 py-4 rounded-full transition-colors duration-200 cursor-pointer">
              לצפייה בשירותים
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <FiveStars className="flex text-gold-bright" />
              <span><strong className="text-ivory">4.9</strong> · 320+ ביקורות</span>
            </div>
            <div className="w-px h-5 bg-hair hidden sm:block" />
            <span>ברברים מוסמכים בלבד</span>
            <div className="w-px h-5 bg-hair hidden sm:block" />
            <span>חניה חופשית בסמוך</span>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <div className="relative rounded-3xl border border-hair bg-gradient-to-b from-card to-surface p-8 sm:p-10 shadow-2xl">
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl bg-gold/15 border border-gold/30 backdrop-blur flex items-center justify-center">
              <svg className="w-9 h-9 text-gold-bright" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" />
                <path strokeLinecap="round" d="M20 6 8.5 12M8.5 12 20 18M4 12h.01" />
              </svg>
            </div>

            <p className="font-serif text-2xl text-ivory leading-snug">"מספרה שמבינה<br />שהפרטים הקטנים<br />עושים את ההבדל."</p>
            <div className="divider-gold my-6" />

            <dl className="grid grid-cols-2 gap-6">
              {STATS.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs text-muted tracking-wide">{label}</dt>
                  <dd className="font-serif text-3xl text-gold-bright mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <a href="#services" aria-label="גלול למטה" className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-gold-light transition-colors cursor-pointer">
        <span className="text-xs tracking-widest">גלילה</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7M12 21V3" /></svg>
      </a>
    </section>
  );
}
