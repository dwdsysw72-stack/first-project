import { useState } from 'react';
import Icon from './Icon.jsx';

const unsplash = (id, w, h, q = 70) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;

// Photo frame with a styled fallback (tinted gradient + icon) if the image can't load.
export default function Photo({ id, w, h, alt, icon = 'pizza', className = 'photo', priority = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={className}>
      <Icon name={icon} />
      {!failed && (
        <img
          src={unsplash(id, w, h)}
          width={w}
          height={h}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
