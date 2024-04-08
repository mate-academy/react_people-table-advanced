import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import React from 'react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <App />
  </Router>,
);
