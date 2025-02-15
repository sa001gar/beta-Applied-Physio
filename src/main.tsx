import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preload lazy-loaded components
const preloadComponents = () => {
  const components = [
    () => import('./components/Services'),
    () => import('./pages/ServiceDetails'),
    () => import('./pages/About'),
    () => import('./pages/Contact'),
    () => import('./pages/Blog'),
    () => import('./pages/BlogPost'),
    () => import('./pages/Social'),
    () => import('./components/Features'),
    () => import('./components/Testimonials')
  ];

  components.forEach(component => {
    component().then(() => {
      // Component preloaded
    }).catch(() => {
      // Handle error
    });
  });
};

// Start preloading after initial render
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Preload components after initial render
preloadComponents();