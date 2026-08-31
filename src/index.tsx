/* eslint-disable prettier/prettier */
import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import React from 'react';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <App />,
);
