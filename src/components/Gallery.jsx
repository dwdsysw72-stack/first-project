import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const TILES = [
  { label: 'פינת המתנה', bg: 'from-card to-stone', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0Z" /> },
  { label: 'מוצרי פרימיום', bg: 'from-stone to-card', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2 14.5 8.5 21 9.5 16.3 14 17.6 20.5 12 17.3 6.4 20.5 7.7 14 3 9.5 9.5 8.5 12 2Z" /> },
  { label: 'כלי עבודה', bg: 'from-card to-ink', icon: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path strokeLinecap="round" d="M20 6 8.5 12M8.5 12 20 18" /></> },
  { label: 'פינת הגילוח', bg: 'from-ink to-stone', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l7 7M4 20l16-16M13 11l7 7-2 2-7-7" /> },
];

const tileClass = 'mosaic-tile rounded-2xl border border-hair bg-gradient-to-br aspect-square flex items-end p-5';

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 sm:py-32 bg-surface border-y border-hair">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="אווירה בסלון" title="הסטודיו שלנו" />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Reveal className={`${tileClass} from-stone to-ink col-span-2 row-span-2`}>
            <div className="relative z-10">
              <svg className="w-10 h-10 text-gold-bright mb-3" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" /></svg>
              <p className="font-serif text-xl text-ivory">עמדות עבודה פרטיות</p>
            </div>
          </Reveal>
          {TILES.map(({ label, bg, icon }, i) => (
            <Reveal key={label} delay={(i + 1) * 60} className={`${tileClass} ${bg}`}>
              <div className="relative z-10">
                <svg className="w-8 h-8 text-gold-bright mb-2" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">{icon}</svg>
                <p className="font-serif text-sm text-ivory">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
