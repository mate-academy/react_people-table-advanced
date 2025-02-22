import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { PeopleProvider } from './store/PeopleContext';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <PeopleProvider>
      <Root />
    </PeopleProvider>
  </Router>,
);
