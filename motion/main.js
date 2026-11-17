/* ORBIT — motion layer (GSAP + ScrollTrigger + Lenis) */
(() => {
  const html = document.documentElement;
  const loader = document.querySelector('.loader');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // If GSAP failed to load, the page is still fully readable (CSS fallbacks).
  if (!window.gsap || !window.ScrollTrigger) {
    loader && loader.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  html.classList.add('js-motion');

  /* ---------------- Smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor links go through Lenis for a smooth ride
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (x) => 1 - Math.pow(1 - x, 4) });
      else if (target === 0) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---------------- Nav: glass on scroll, hide on scroll down ---------------- */
  const nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const y = self.scroll();
      nav.classList.toggle('is-scrolled', y > 40);
      nav.classList.toggle('is-hidden', self.direction === 1 && y > window.innerHeight * 0.8);
    },
  });

  /* ---------------- Reduced motion: show everything, no theatrics ---------------- */
  if (reduce) {
    loader && loader.remove();
    html.classList.remove('js-motion');
    return;
  }

  /* ---------------- Preloader → hero intro ---------------- */
  lenis && lenis.stop();
  const num = loader.querySelector('.loader__num');
  const counter = { v: 0 };
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

  intro
    .to(counter, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => (num.textContent = Math.round(counter.v)) })
    .to('.loader__bar span', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
    .to('.loader > *', { yPercent: -60, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.in' })
    .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.2')
    .set(loader, { display: 'none' })
    .from('.hero .line__inner', { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.09 }, '-=0.55')
    .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 1 }, '<0.2')
    .from('.hero__sub, .hero__ctas > *', { y: 30, opacity: 0, filter: 'blur(8px)', duration: 1.1, stagger: 0.08 }, '<0.25')
    .from('.hero__meta', { opacity: 0, duration: 1 }, '<0.3')
    .from('.nav > *', { y: -24, opacity: 0, duration: 1, stagger: 0.08 }, '<')
    .add(() => lenis && lenis.start());
  // the CSS safety-fade isn't needed anymore
  loader.style.animation = 'none';

  /* ---------------- Hero parallax on scroll ---------------- */
  gsap.to('.hero__content', {
    yPercent: -18, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ---------------- Generic reveals ---------------- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 50, opacity: 0, filter: 'blur(10px)', duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
  gsap.utils.toArray('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 70, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: group, start: 'top 85%' },
    });
  });

  /* ---------------- Statement: words light up while scrolling ---------------- */
  const statement = document.querySelector('.statement');
  if (statement) {
    const wrapWords = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) {
          child.classList.add('w');
        }
      });
    };
    wrapWords(statement);
    gsap.fromTo(statement.querySelectorAll('.w'), { opacity: 0.14 }, {
      opacity: 1, stagger: 0.06, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
    });
  }

  /* ---------------- Counters ---------------- */
  document.querySelectorAll('.count').forEach((el) => {
    const target = +el.dataset.count;
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: target, duration: 2.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(o.v)),
    });
  });

  /* ---------------- Marquee reacting to scroll velocity ---------------- */
  const loops = [];
  document.querySelectorAll('.marquee__row').forEach((row) => {
    const dir = +row.dataset.dir;
    const track = row.querySelector('.marquee__track');
    const tween = gsap.fromTo(track, { xPercent: dir === 1 ? 0 : -50 }, { xPercent: dir === 1 ? -50 : 0, duration: dir === 1 ? 32 : 38, ease: 'none', repeat: -1 });
    loops.push(tween);
  });
  let skewTo = gsap.quickTo('.marquee__group', 'skewX', { duration: 0.5, ease: 'power3' });
  ScrollTrigger.create({
    trigger: '.marquee', start: 'top bottom', end: 'bottom top',
    onUpdate(self) {
      const v = self.getVelocity();
      const boost = 1 + Math.min(Math.abs(v) / 300, 6);
      loops.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true }));
      skewTo(gsap.utils.clamp(-10, 10, v / -150));
      clearTimeout(self._t);
      self._t = setTimeout(() => {
        loops.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.2, overwrite: true }));
        skewTo(0);
      }, 120);
    },
  });

  /* ---------------- Work: pinned horizontal scroll (RTL) ---------------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const section = document.querySelector('.work');
    const track = section.querySelector('.work__track');
    section.classList.add('is-pinned');
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const h = gsap.to(track, {
      x: () => dist(), // RTL: content extends to the left, so we slide it right
      ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => '+=' + dist(),
        pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      },
    });
    // inner parallax: each project title drifts against the scroll direction
    const words = [...section.querySelectorAll('.project__word')];
    const drift = () => {
      const cx = window.innerWidth / 2;
      words.forEach((w) => {
        const r = w.parentElement.getBoundingClientRect();
        gsap.set(w, { x: ((r.left + r.width / 2) - cx) * -0.12 });
      });
    };
    h.eventCallback('onUpdate', drift);
    drift();
    return () => section.classList.remove('is-pinned');
  });

  /* ---------------- Process: progress line + active steps ---------------- */
  const steps = document.querySelector('.steps');
  if (steps) {
    gsap.fromTo(steps.querySelector('.steps__line i'), { '--p': 0 }, {
      '--p': 1, ease: 'none',
      scrollTrigger: { trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
    steps.querySelectorAll('.step').forEach((s) => {
      ScrollTrigger.create({ trigger: s, start: 'top 65%', end: 'bottom 35%', toggleClass: 'is-active' });
    });
  }

  /* ---------------- CTA title + footer wordmark ---------------- */
  gsap.from('.cta .line__inner', {
    yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: 0.1,
    scrollTrigger: { trigger: '.cta__title', start: 'top 82%' },
  });
  gsap.from('.cta__btn', {
    scale: 0, rotate: -90, duration: 1.4, ease: 'elastic.out(1, 0.6)',
    scrollTrigger: { trigger: '.cta__btn', start: 'top 90%' },
  });
  gsap.from('.wordmark span', {
    yPercent: 100, duration: 1.4, ease: 'expo.out', stagger: 0.06,
    scrollTrigger: { trigger: '.wordmark', start: 'top 95%' },
  });

  /* ---------------- Pointer interactions (desktop only) ---------------- */
  if (!finePointer) return;

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.querySelectorAll('a, button, .card, .project').forEach((el) => {
    el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach((el) => {
    const strength = el.classList.contains('cta__btn') ? 0.45 : 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)', overwrite: true });
    });
  });

  // Spotlight + subtle tilt on cards
  document.querySelectorAll('.spot').forEach((el) => {
    const tilt = el.classList.contains('card');
    const rX = tilt && gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const rY = tilt && gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    if (tilt) gsap.set(el, { transformPerspective: 900 });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', px * 100 + '%');
      el.style.setProperty('--my', py * 100 + '%');
      if (tilt) { rX((0.5 - py) * 6); rY((px - 0.5) * 8); }
    });
    el.addEventListener('pointerleave', () => { if (tilt) { rX(0); rY(0); } });
  });
})();
