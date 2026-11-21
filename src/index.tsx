import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Root />
  </HashRouter>,
);
