import BrandMark from './BrandMark.jsx';
import Icon from './Icon.jsx';
import { NAV_ITEMS } from './Nav.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <a className="brand" href="#top">
          <BrandMark />
          <span className="brand-name">Tanur</span>
        </a>
        <nav aria-label="Footer">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="social" href="#" aria-label="Tanur on Instagram"><Icon name="instagram-logo" /></a>
        <p>© {new Date().getFullYear()} Tanur Pizza Co.</p>
      </div>
    </footer>
  );
}
