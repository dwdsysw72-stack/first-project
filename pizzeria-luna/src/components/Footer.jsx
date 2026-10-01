import Icon from './Icon.jsx';
import { Logo, NAV_ITEMS } from './Nav.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <Logo />
        <nav aria-label="ניווט תחתון">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="social" href="#" aria-label="לונה באינסטגרם"><Icon name="instagram-logo" /></a>
        <p>© {new Date().getFullYear()} לונה פיצה</p>
      </div>
    </footer>
  );
}
