import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
