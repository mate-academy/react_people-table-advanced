import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { FilterContextProvider } from './context/FiltersContext';
import { PeopleContextProvider } from './context/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <FilterContextProvider>
      <PeopleContextProvider>
        <App />
      </PeopleContextProvider>
    </FilterContextProvider>
  </Router>,
);
