import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
