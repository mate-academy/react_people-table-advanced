import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Routes as AppRoutes } from './utils/routes';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path={AppRoutes.ROOT} element={<App />}>
        <Route index element={<HomePage />} />
        <Route
          path={AppRoutes.HOME}
          element={<Navigate to={AppRoutes.ROOT} replace />}
        />
        <Route path={AppRoutes.PEOPLE}>
          <Route index element={<PeoplePage />} />
          <Route path={AppRoutes.PERSON_SLUG} element={<PeoplePage />} />
        </Route>
        <Route path={AppRoutes.NOT_FOUND} element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>,
);
