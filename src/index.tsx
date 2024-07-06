import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/People/PeoplePage';
import { NotFound } from './pages/NotFound/NotFound';
import { App } from './App';
// eslint-disable-next-line
import { PeopleProvider } from './PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>,
);
