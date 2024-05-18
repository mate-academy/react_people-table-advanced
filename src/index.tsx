import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';
import { PeopleProvider } from './components/PeopleProvider.tsx/PeopleProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <Root />
    </PeopleProvider>
  </Router>,
);
