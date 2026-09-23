import { Fragment } from 'react';

const ITEMS = [
  'מוצרי טיפוח פרימיום',
  'מגזיני סטייל מובילים המליצו עלינו',
  'הדרכה מקצועית שוטפת לצוות',
  'ציוד גילוח סטרייט־רייזר קלאסי',
];

export default function TrustStrip() {
  return (
    <section className="border-y border-hair bg-surface/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-muted text-sm tracking-wide">
        {ITEMS.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && <span className="w-1 h-1 rounded-full bg-hair" />}
            <span>{item}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
