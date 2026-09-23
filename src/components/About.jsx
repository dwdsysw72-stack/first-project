import Reveal from './Reveal.jsx';
import { CheckIcon } from './icons.jsx';

const POINTS = [
  'ייעוץ אישי לפני כל טיפול',
  'חומרי טיפוח פרימיום בלבד',
  'כלי עבודה מחוטאים ומקצועיים',
  'אווירת בוטיק, לא מספרה המונית',
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-hair bg-gradient-to-br from-stone via-card to-ink">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(217,178,91,0.12) 0 2px, transparent 2px 14px)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-40 h-40 text-gold/70" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <rect x="4" y="2" width="2" height="20" rx="1" fill="currentColor" stroke="none" />
                <rect x="18" y="2" width="2" height="20" rx="1" fill="currentColor" stroke="none" />
                <path d="M6 4c4 2 8-2 12 0M6 8c4 2 8-2 12 0M6 12c4 2 8-2 12 0M6 16c4 2 8-2 12 0M6 20c4 2 8-2 12 0" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="absolute bottom-6 right-6 left-6 rounded-2xl bg-ink/70 backdrop-blur border border-hair px-5 py-4">
              <p className="text-sm text-muted">סטודיו פתוח יום־יום</p>
              <p className="font-serif text-lg text-ivory mt-0.5">09:00 – 21:00</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 order-1 lg:order-2">
          <p className="text-gold-light tracking-widest text-sm font-semibold mb-3">הסיפור שלנו</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory leading-tight">
            לא עוד מספרה —<br />מקום שבו אתם <span className="text-gradient-gold">נראים ומרגישים אחרת</span>
          </h2>
          <p className="mt-6 text-muted leading-relaxed text-lg">
            NOIR נולדה מתוך אמונה אחת פשוטה: תספורת טובה היא לא רק עניין של מספריים,
            אלא של תשומת לב, זמן ומקצועיות. הצוות שלנו עבר הכשרה בטכניקות קלאסיות
            ומודרניות כאחד, כדי להתאים בדיוק לצורת הפנים, מרקם השיער והאופי שלכם.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5 text-gold-bright" />
                </span>
                <span className="text-ivory/90 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
