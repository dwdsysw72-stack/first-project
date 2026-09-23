import LiftCard from './LiftCard.jsx';
import SectionHeading from './SectionHeading.jsx';

const TEAM = [
  { initials: 'אב', name: 'אבי כהן', role: 'מייסד וברבר ראשי', bio: '15 שנות ניסיון · מומחה בעיצוב זקן וגילוח קלאסי' },
  { initials: 'רן', name: 'רן לוי', role: 'סטייליסט בכיר', bio: 'מתמחה בתספורות פייד ועיצוב עדכני' },
  { initials: 'עדי', name: 'עדי מזרחי', role: 'מומחית צבע וטיפוח', bio: 'התמחות בכיסוי שיער לבן וגוונים טבעיים' },
  { initials: 'תום', name: 'תום שגיא', role: 'ברבר וטיפוח פנים', bio: 'מומחה בטיפולי פנים וגילוח בסכין ישנה' },
];

export default function Team() {
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="הצוות שלנו" title="אומני הברבר של NOIR" />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ initials, name, role, bio }, i) => (
            <LiftCard key={name} delay={i * 60} className="bg-card border border-hair rounded-2xl p-7 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold-dark p-[2px]">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center font-serif text-2xl text-gold-bright">{initials}</div>
              </div>
              <h3 className="font-serif text-lg text-ivory mt-5">{name}</h3>
              <p className="text-gold-light text-xs mt-1 tracking-wide">{role}</p>
              <p className="text-muted text-sm mt-3 leading-relaxed">{bio}</p>
            </LiftCard>
          ))}
        </div>
      </div>
    </section>
  );
}
