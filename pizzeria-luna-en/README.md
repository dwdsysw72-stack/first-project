# LUNA: late-night pizzeria landing page (US English)

English, US-localized version of `../pizzeria-luna` (prices in $, °F, miles, Chicago address, 12-hour times). React + Vite, every animation in [framer-motion](https://motion.dev).

- **Style and colors:** `ui-ux-pro-max` (Brutalism: playful orange `#F97316` on cream, 2px ink borders, hard shadows). Fonts: Outfit + Work Sans (the ui-ux-pro-max pick), self-hosted.
- **Layout and motion:** `taste-skill` with MOTION_INTENSITY 10:
  - pizza that spins on its own, and faster as you scroll
  - ingredients floating around it that follow the mouse
  - letter-by-letter headline, magnetic buttons
  - 3D tilt menu cards with photo zoom on hover
  - marquee that reacts to scroll speed and direction
  - sticky stacking "how it's made" cards, three-column parallax gallery
  - draggable reviews, scroll progress bar
- Touch devices skip the mouse-only effects; `prefers-reduced-motion` gets a still page.

```bash
cd pizzeria-luna-en
npm install
npm run dev
npm run build   # → pizzeria-luna-en/dist/
```

Placeholders to replace before going live are listed at the top of `index.html`.
