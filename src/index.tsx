import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { PeopleContextProvider } from './contexts/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <PeopleContextProvider>
        <App />
      </PeopleContextProvider>
    </Router>
    ,
  );
