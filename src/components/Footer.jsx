import { useState } from 'react';

function NewsletterForm() {
  const [joined, setJoined] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setJoined(true);
  };
  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <label htmlFor="newsletterEmail" className="sr-only">כתובת אימייל</label>
      <input
        id="newsletterEmail" type="email" required placeholder="האימייל שלך"
        className="min-w-0 flex-1 bg-card border border-hair rounded-full px-4 py-2.5 text-sm text-ivory placeholder:text-muted/60 focus:border-gold transition-colors duration-200"
      />
      <button type="submit" className="shrink-0 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 rounded-full transition-colors duration-200 cursor-pointer">
        {joined ? 'נרשמת! תודה' : 'הצטרפות'}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-hair bg-surface">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <a href="#hero" className="flex items-center gap-3 mb-4 cursor-pointer">
            <span className="w-9 h-9 rounded-full border border-gold/60 flex items-center justify-center font-serif text-gold-bright">N</span>
            <span className="font-serif text-lg text-ivory">NOIR</span>
          </a>
          <p className="text-muted text-sm leading-relaxed">מספרת בוטיק לגבר המודרני — דיוק, אווירה ופינוק בכל ביקור.</p>
        </div>

        <div>
          <h4 className="text-ivory text-sm font-semibold mb-4">ניווט מהיר</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><a href="#services" className="hover:text-gold-light transition-colors cursor-pointer">שירותים</a></li>
            <li><a href="#team" className="hover:text-gold-light transition-colors cursor-pointer">הצוות</a></li>
            <li><a href="#gallery" className="hover:text-gold-light transition-colors cursor-pointer">גלריה</a></li>
            <li><a href="#booking" className="hover:text-gold-light transition-colors cursor-pointer">קביעת תור</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-ivory text-sm font-semibold mb-4">שעות פעילות</h4>
          <ul className="space-y-2.5 text-sm text-muted">
            <li className="flex justify-between gap-4"><span>א׳ – ה׳</span><span>09:00–21:00</span></li>
            <li className="flex justify-between gap-4"><span>שישי</span><span>08:00–15:00</span></li>
            <li className="flex justify-between gap-4"><span>שבת</span><span>סגור</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-ivory text-sm font-semibold mb-4">הישארו מעודכנים</h4>
          <p className="text-muted text-sm mb-4">הצטרפו לרשימת התפוצה לקבלת מבצעים והטבות.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-hair">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} NOIR Barbershop. כל הזכויות שמורות.</p>
          <p>עוצב באהבה עבור גברים שאוהבים להיראות טוב.</p>
        </div>
      </div>
    </footer>
  );
}
