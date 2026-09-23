import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { WhatsAppIcon } from './icons.jsx';

const REQUIRED = ['fullName', 'phone', 'service', 'date'];
const SERVICE_OPTIONS = [
  'תספורת קלאסית — ₪120',
  'עיצוב זקן מקצועי — ₪80',
  'גילוח קלאסי בסכין — ₪90',
  'צביעה וטיפוח שיער — ₪150',
  'טיפוח פנים לגבר — ₪110',
  'חבילת VIP מלאה — ₪280',
];
const inputClass = 'w-full bg-surface border rounded-xl px-4 py-3 text-ivory placeholder:text-muted/60 focus:border-gold transition-colors duration-200';

function errorFor(field) {
  if (field.checkValidity()) return '';
  return field.validity.valueMissing ? 'שדה חובה — נא למלא' : 'ערך לא תקין, נא לבדוק שוב';
}

function Field({ id, label, required, error, className = 'sm:col-span-1', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-ivory/90 mb-2">
        {label} {required && <span className="text-gold-light">*</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            className="text-red-400 text-xs mt-1.5"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function BookingForm() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { text, tone: 'error' | 'success' }
  const [submitting, setSubmitting] = useState(false);

  const validate = (field) => {
    const message = errorFor(field);
    setErrors((prev) => ({ ...prev, [field.name]: message }));
    return !message;
  };
  const onBlur = (e) => validate(e.target);
  const borderFor = (name) => (errors[name] ? 'border-red-400' : 'border-hair');

  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const results = REQUIRED.map((name) => validate(form.elements[name]));
    if (results.includes(false)) {
      setStatus({ text: 'נא לתקן את השדות המסומנים לפני השליחה.', tone: 'error' });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    // Simulated network call — wire this endpoint up to your real booking system.
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ text: '✓ הבקשה נשלחה בהצלחה! ניצור איתכם קשר לאישור בקרוב.', tone: 'success' });
      form.reset();
    }, 1200);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-5" noValidate>
      <Field id="fullName" label="שם מלא" required error={errors.fullName}>
        <input type="text" id="fullName" name="fullName" required onBlur={onBlur} className={`${inputClass} ${borderFor('fullName')}`} placeholder="ישראל ישראלי" />
      </Field>

      <Field id="phone" label="טלפון" required error={errors.phone}>
        <input type="tel" id="phone" name="phone" required inputMode="tel" onBlur={onBlur} className={`${inputClass} ${borderFor('phone')}`} placeholder="050-1234567" />
      </Field>

      <Field id="service" label="סוג טיפול" required error={errors.service}>
        <select id="service" name="service" required defaultValue="" onBlur={onBlur} className={`${inputClass} ${borderFor('service')} cursor-pointer`}>
          <option value="" disabled>בחרו טיפול</option>
          {SERVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </Field>

      <Field id="date" label="תאריך מועדף" required error={errors.date}>
        <input type="date" id="date" name="date" required onBlur={onBlur} className={`${inputClass} ${borderFor('date')} cursor-pointer`} />
      </Field>

      <Field id="message" label="הערות נוספות" className="sm:col-span-2">
        <textarea id="message" name="message" rows="3" className={`${inputClass} border-hair resize-none`} placeholder="ברבר מועדף, שעה מועדפת וכו׳" />
      </Field>

      <div className="sm:col-span-2 flex items-center justify-between flex-wrap gap-4">
        <p className={`text-sm ${status?.tone === 'error' ? 'text-red-400' : status?.tone === 'success' ? 'text-gold-light' : 'text-muted'}`} role="status" aria-live="polite">
          {status?.text}
        </p>
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          className="btn-shine inline-flex items-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-full shadow-gold transition-colors duration-200 cursor-pointer"
        >
          <span>{submitting ? 'שולח בקשה…' : 'שליחת בקשה לתור'}</span>
          {submitting && (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
        </motion.button>
      </div>
    </form>
  );
}

const socialClass = 'w-10 h-10 rounded-full border border-hair flex items-center justify-center text-muted hover:text-gold-bright hover:border-gold transition-colors duration-200 cursor-pointer';

export default function Booking() {
  return (
    <section id="booking" className="py-4 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
        <Reveal id="contact" className="lg:col-span-7 bg-card border border-hair rounded-3xl p-8 sm:p-10">
          <p className="text-gold-light tracking-widest text-sm font-semibold mb-3">קביעת תור</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory">נשמח לראות אתכם</h2>
          <p className="mt-3 text-muted">מלאו פרטים ונחזור אליכם לאישור תוך זמן קצר — או פשוט התקשרו.</p>
          <BookingForm />
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-card border border-hair rounded-3xl p-8">
            <h3 className="font-serif text-xl text-ivory mb-5">פרטי התקשרות</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span className="text-ivory/90">רוטשילד 12, תל אביב</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h1.7c.5 0 .95.34 1.08.83l1 3.65a1.12 1.12 0 01-.32 1.13L7.4 10.1a12.5 12.5 0 006.5 6.5l1.5-1.56a1.12 1.12 0 011.13-.32l3.65 1c.49.13.83.58.83 1.08v1.7A2.5 2.5 0 0118.5 21C10 21 3 14 3 5.5Z" /></svg>
                <a href="tel:+972501234567" className="text-ivory/90 hover:text-gold-light transition-colors cursor-pointer" dir="ltr">050-123-4567</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1Z" /></svg>
                <a href="mailto:hello@noir-barber.co.il" className="text-ivory/90 hover:text-gold-light transition-colors cursor-pointer">hello@noir-barber.co.il</a>
              </li>
            </ul>

            <div className="divider-gold my-6" />

            <h4 className="text-sm text-ivory mb-3">שעות פעילות</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex justify-between"><span>ראשון – חמישי</span><span className="text-ivory/80">09:00 – 21:00</span></li>
              <li className="flex justify-between"><span>שישי</span><span className="text-ivory/80">08:00 – 15:00</span></li>
              <li className="flex justify-between"><span>שבת</span><span className="text-ivory/80">סגור</span></li>
            </ul>

            <div className="divider-gold my-6" />

            <div className="flex items-center gap-3">
              <a href="#" aria-label="עמוד האינסטגרם שלנו" className={socialClass}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg>
              </a>
              <a href="#" aria-label="עמוד הפייסבוק שלנו" className={socialClass}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8h-2a2 2 0 00-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5c0-.5.2-1 1-1h1.8V8Z" /></svg>
              </a>
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener" aria-label="שלחו לנו הודעת וואטסאפ" className={socialClass}>
                <WhatsAppIcon className="w-[18px] h-[18px]" withBubble />
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-hair h-56">
            <iframe
              title="מפת המיקום שלנו"
              className="w-full h-full grayscale-[40%] contrast-125"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=%D7%A8%D7%95%D7%98%D7%A9%D7%99%D7%9C%D7%93%2012%2C%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
