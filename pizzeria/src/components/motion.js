// Shared motion tokens (taste-skill: spring-like ease-out, transform + opacity only).
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

export const tap = { scale: 0.97 };
