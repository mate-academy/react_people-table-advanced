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
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';
import { PersonProvider } from './components/PeopleContext/PeopleContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PersonProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </PersonProvider>,
);
