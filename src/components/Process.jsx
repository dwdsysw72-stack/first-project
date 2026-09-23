import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const STEPS = [
  { title: 'קביעת תור', text: 'אונליין, בטלפון או בוואטסאפ — תוך פחות מדקה.' },
  { title: 'קבלת פנים', text: 'משקה על הבית ושיחת ייעוץ קצרה על הלוק הרצוי.' },
  { title: 'הטיפול המקצועי', text: 'דיוק, סבלנות ותשומת לב לכל פרט קטן.' },
  { title: 'הופעה מנצחת', text: 'אתם יוצאים בביטחון מלא — ותמיד מוזמנים לחזור.' },
];

export default function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="איך זה עובד" title="מהכניסה ועד היציאה" />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          <div className="hidden lg:block absolute top-8 right-[12%] left-[12%] h-px bg-gradient-to-l from-transparent via-hair to-transparent" />
          {STEPS.map(({ title, text }, i) => (
            <Reveal key={title} delay={i * 60} className="text-center relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-card border border-gold/40 flex items-center justify-center font-serif text-2xl text-gold-bright relative z-10">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-lg text-ivory mt-5">{title}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
