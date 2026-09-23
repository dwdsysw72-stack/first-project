import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export default function useScrolledPast(threshold) {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(() => typeof window !== 'undefined' && window.scrollY > threshold);
  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > threshold));
  return past;
}
