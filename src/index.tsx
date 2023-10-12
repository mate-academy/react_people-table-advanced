import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleContext } from './store/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <PeopleContext>
        <App />
      </PeopleContext>
    </Router>,
  );
