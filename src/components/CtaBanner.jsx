import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { WhatsAppIcon } from './icons.jsx';

const WHATSAPP_URL = 'https://wa.me/972501234567?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%95%D7%A2%20%D7%AA%D7%95%D7%A8%20%D7%91-NOIR';

export default function CtaBanner() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-gold-dark via-gold to-gold-dark px-8 py-14 sm:px-16 sm:py-16 text-center">
          <motion.svg
            className="absolute -top-10 -right-10 w-56 h-56 opacity-20" fill="none" stroke="#0C0A09" strokeWidth="1" viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" />
          </motion.svg>
          <h2 className="relative font-serif text-3xl sm:text-4xl text-ink">מוכנים לשדרג את הלוק שלכם?</h2>
          <p className="relative mt-3 text-ink/80 max-w-lg mx-auto">קבעו תור עוד היום וקבלו 10% הנחה על הטיפול הראשון שלכם ב-NOIR.</p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#booking" className="btn-shine bg-ink text-ivory font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-ink/90 transition-colors duration-200 cursor-pointer">
              קביעת תור אונליין
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border-2 border-ink text-ink font-semibold px-8 py-4 rounded-full hover:bg-ink hover:text-ivory transition-colors duration-200 cursor-pointer">
              <WhatsAppIcon className="w-5 h-5" />
              וואטסאפ
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
