// --- folder-structure-viewer/client/src/main.tsx ---
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';

// This is the entry point for the React application.
// We get the root element and render our main components into it.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* The GlobalStyle component from styled-components applies our base CSS */}
    <GlobalStyle />
    {/* The main application component */}
    <App />
  </StrictMode>
);
