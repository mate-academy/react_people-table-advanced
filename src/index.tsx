import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { App } from './App';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
