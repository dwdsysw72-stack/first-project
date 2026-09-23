import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto">
      <p className="text-gold-light tracking-widest text-sm font-semibold mb-3">{eyebrow}</p>
      <h2 className="font-serif text-4xl sm:text-5xl text-ivory">{title}</h2>
      {children}
    </Reveal>
  );
}
