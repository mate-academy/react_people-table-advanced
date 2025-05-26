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
import { PeopleProvider } from './context/PeopleProvider';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './Pages/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slugs" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>,
);
