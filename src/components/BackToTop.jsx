import { AnimatePresence, motion } from 'framer-motion';
import useScrolledPast from './useScrolledPast.js';

export default function BackToTop() {
  const visible = useScrolledPast(600);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="חזרה לראש העמוד"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gold text-white shadow-gold flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
