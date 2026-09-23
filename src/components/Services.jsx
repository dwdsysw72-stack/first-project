import LiftCard from './LiftCard.jsx';
import SectionHeading from './SectionHeading.jsx';

const SERVICES = [
  {
    title: 'תספורת קלאסית',
    description: 'גזירה מדויקת בעזרת מספריים ומכונה, כולל עיצוב וסיום עם מוצרי סטיילינג.',
    price: 120,
    icon: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path strokeLinecap="round" d="M20 6 8.5 12M8.5 12 20 18" /></>,
  },
  {
    title: 'עיצוב זקן מקצועי',
    description: 'קו עיצוב חד, החלקה וטיפוח עם שמנים ובלמים ייעודיים לזקן.',
    price: 80,
    icon: <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.5 0-6 3-6 7 0 5 2.5 8 3.5 9.5.4.6 1.2.6 1.6 0C12.1 18 14.6 15 14.6 10c0-2.5-1-4.5-2.6-5.5" />
      <path strokeLinecap="round" d="M9 9c1 1.5 3 1.5 4 0" />
    </>,
  },
  {
    title: 'גילוח קלאסי בסכין',
    description: 'טקס גילוח מסורתי עם מגבת חמה, קצף חם וסכין ישנה — פינוק אמיתי.',
    price: 90,
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l7 7M4 20l16-16M13 11l7 7-2 2-7-7M6 16l-2 2 2 2 2-2" />,
  },
  {
    title: 'צביעה וטיפוח שיער',
    description: 'כיסוי שיער לבן וגוונים טבעיים בשיטות עדינות לקרקפת.',
    price: 150,
    icon: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 3v18M3 12h18" strokeWidth="1" /></>,
  },
  {
    title: 'טיפוח פנים לגבר',
    description: 'ניקוי עמוק, מסכת פחם ועיסוי פנים לרענון וחיוניות העור.',
    price: 110,
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0Z" /><path strokeLinecap="round" d="M9 12a3 3 0 106 0 3 3 0 00-6 0Z" /></>,
  },
];

const delayFor = (i) => (i % 3) * 60;

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-surface border-y border-hair">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="השירותים שלנו" title="טיפוח בדיוק כירורגי">
          <p className="mt-4 text-muted text-lg">כל שירות מותאם אישית — מהייעוץ ועד לתוצאה הסופית.</p>
        </SectionHeading>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ title, description, price, icon }, i) => (
            <LiftCard key={title} delay={delayFor(i)} className="group bg-card border border-hair rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                <svg className="w-7 h-7 text-gold-bright group-hover:text-ink transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  {icon}
                </svg>
              </div>
              <h3 className="font-serif text-xl text-ivory">{title}</h3>
              <p className="mt-3 text-muted text-sm leading-relaxed">{description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-serif text-2xl text-gold-bright">₪{price}</span>
                <a href="#booking" className="text-sm font-semibold text-ivory/80 hover:text-gold-light transition-colors cursor-pointer">הזמנה ←</a>
              </div>
            </LiftCard>
          ))}

          <LiftCard delay={delayFor(SERVICES.length)} className="group relative bg-gradient-to-b from-gold-dark/25 to-card border border-gold/50 rounded-2xl p-8">
            <span className="absolute -top-3 right-8 bg-gold text-ink text-xs font-bold px-3 py-1 rounded-full">הכי פופולרי</span>
            <div className="w-14 h-14 rounded-xl bg-gold/20 border border-gold/50 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-gold-bright" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2 14.5 8.5 21 9.5 16.3 14 17.6 20.5 12 17.3 6.4 20.5 7.7 14 3 9.5 9.5 8.5 12 2Z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-ivory">חבילת VIP מלאה</h3>
            <p className="mt-3 text-muted text-sm leading-relaxed">תספורת + עיצוב זקן + גילוח בסכין + טיפוח פנים + משקה על הבית.</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-serif text-2xl text-gold-bright">₪280</span>
              <a href="#booking" className="text-sm font-semibold text-gold-light hover:text-gold-bright transition-colors cursor-pointer">הזמנה ←</a>
            </div>
          </LiftCard>
        </div>
      </div>
    </section>
  );
}
