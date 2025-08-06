// src/index.tsx (ou src/index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'; // Certifique-se de que esta importação existe se você a tiver

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // Comente ou remova estas linhas para desabilitar o Strict Mode em desenvolvimento/testes
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);
