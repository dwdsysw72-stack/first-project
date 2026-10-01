import BrandMark from './BrandMark.jsx';
import Icon from './Icon.jsx';
import { NAV_ITEMS } from './Nav.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <a className="brand" href="#top">
          <BrandMark />
          <span className="brand-name">תנור</span>
        </a>
        <nav aria-label="ניווט תחתון">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="social" href="#" aria-label="תנור באינסטגרם"><Icon name="instagram-logo" /></a>
        <p>© {new Date().getFullYear()} תנור פיצרייה</p>
      </div>
    </footer>
  );
}
