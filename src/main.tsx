import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App, { preloadRoute } from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;

// Prerendered pages already contain their markup. Render() replaces it, and
// would show the lazy "Loading" fallback first if the page's code had not
// arrived, which shifts the layout and delays the largest paint. Loading the
// current route's code first keeps the static HTML on screen until the swap.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .finally(() => {
    createRoot(root).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  });
