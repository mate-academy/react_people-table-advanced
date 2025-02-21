import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>,
);

// const nameFilter = searchParams.get('name') || '';
// const sexFilter = searchParams.get('sex') || '';
// const bornFilter = searchParams.get('born') || '';
// const diedFilter = searchParams.get('died') || '';

// const filteredPeople = people.filter(person => {
//   const matchesName = person.name
//     .toLowerCase()
//     .includes(nameFilter.toLowerCase());
//   const matchesSex = sexFilter ? person.sex === sexFilter : true;
//   const matchesBorn = bornFilter ? person.born === bornFilter : true;
//   const matchesDied = diedFilter ? person.died === diedFilter : true;

//   return matchesName && matchesSex && matchesBorn && matchesDied;
// });
