import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { FiveStars } from './icons.jsx';

const QUOTES = [
  { quote: 'האווירה, השירות, התוצאה — הכול ברמה אחרת. הגילוח בסכין הוא חוויה שחובה לנסות.', initials: 'מ.ג', name: 'מיכאל גרוס', meta: 'לקוח קבוע · שנתיים' },
  { quote: 'סוף סוף מקום שמבין תספורות פייד נכון. קבעתי תור קבוע כל שלושה שבועות.', initials: 'ד.כ', name: 'דניאל כרמי', meta: 'לקוח קבוע · שנה' },
  { quote: 'חבילת ה-VIP שווה כל שקל. יצאתי מרגיש כמו בנאדם חדש לגמרי.', initials: 'ע.ש', name: 'עומר שני', meta: 'לקוח חדש' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-surface border-y border-hair">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="לקוחות ממליצים" title="מה אומרים עלינו" />

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {QUOTES.map(({ quote, initials, name, meta }, i) => (
            <Reveal key={name} as="blockquote" delay={i * 60} className="bg-card border border-hair rounded-2xl p-8">
              <FiveStars className="flex text-gold-bright gap-1 mb-5" />
              <p className="text-ivory/90 leading-relaxed">"{quote}"</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-serif text-gold-bright text-sm">{initials}</div>
                <div>
                  <p className="text-ivory text-sm font-semibold">{name}</p>
                  <p className="text-muted text-xs">{meta}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
