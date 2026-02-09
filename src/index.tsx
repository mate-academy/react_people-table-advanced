import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import React from 'react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
