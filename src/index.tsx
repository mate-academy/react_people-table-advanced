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
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import { AppPath, PathParam } from './types';
import PeoplePage from './pages/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={AppPath.Home} element={<Navigate to="/" replace />} />
        <Route path={AppPath.People}>
          <Route index element={<PeoplePage />} />
          <Route path={`:${PathParam.Slug}`} element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>,
);
