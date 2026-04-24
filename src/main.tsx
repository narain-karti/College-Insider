import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle benign WebSocket errors from Vite proxy during development
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && typeof event.reason.message === 'string') {
      if (
        event.reason.message.includes('WebSocket') || 
        event.reason.message.includes('vite') ||
        event.reason.message.includes('HMR')
      ) {
        event.preventDefault();
      }
    }
  });

  // Also handle window errors for the same
  window.addEventListener('error', (event) => {
    if (event.message && (event.message.includes('WebSocket') || event.message.includes('vite'))) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
