import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon.jsx';

export const unsplash = (id, w, h, q = 70) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;

// <img> with a styled fallback (tinted block + icon) if the photo can't load.
export default function Photo({ id, w, h, alt, icon = 'pizza', style, priority = false, imgProps }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <span className="photo-fallback"><Icon name={icon} /></span>
      {!failed && (
        <motion.img
          src={unsplash(id, w, h)}
          width={w}
          height={h}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          onError={() => setFailed(true)}
          style={style}
          {...imgProps}
        />
      )}
    </>
  );
}
