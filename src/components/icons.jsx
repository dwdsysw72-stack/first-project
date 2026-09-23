const STAR_PATH = 'M10 1.5 12.35 7l6.15.5-4.7 3.9 1.5 6-5.3-3.4L4.7 17.4l1.5-6L1.5 7.5 7.65 7 10 1.5Z';
const WHATSAPP_PATH = 'M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.33 4.94L2 22l5.2-1.36A9.94 9.94 0 0012.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10Zm5.78 14.2c-.24.68-1.4 1.3-1.93 1.36-.49.06-1.1.09-1.78-.11-.41-.12-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.81 1.94.88 2.08.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.35-.42.47-.14.14-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.07.18-.28.36-.23.6-.14.24.09 1.53.72 1.8.85.26.14.44.2.5.32.06.12.06.68-.18 1.36Z';
const WHATSAPP_BUBBLE_PATH = 'M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.33 4.94L2 22l5.2-1.36A9.94 9.94 0 0012.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10Z';

export function StarIcon({ className = 'w-4 h-4' }) {
  return <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d={STAR_PATH} /></svg>;
}

export function FiveStars({ className }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <StarIcon key={i} />)}
    </div>
  );
}

export function CheckIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
}

export function WhatsAppIcon({ className, withBubble = false }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      {withBubble && <path d={WHATSAPP_BUBBLE_PATH} opacity=".18" />}
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}
