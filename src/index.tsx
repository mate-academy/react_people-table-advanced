import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Rooot } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Rooot />
  </Router>,
);
