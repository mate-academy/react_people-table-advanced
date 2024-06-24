import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleProvider } from './Contexts/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleProvider>
    <Router>
      <App />
    </Router>
  </PeopleProvider>,
);
