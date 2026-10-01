import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Self-hosted fonts (taste-skill: no Google Fonts <link> in production).
import '@fontsource/karantina/400.css';
import '@fontsource/karantina/700.css';
import '@fontsource/noto-sans-hebrew/400.css';
import '@fontsource/noto-sans-hebrew/500.css';
import '@fontsource/noto-sans-hebrew/700.css';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
