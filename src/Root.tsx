import {
  Route,
  Routes,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NavLinks } from './types/NavLinks';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={NavLinks.Home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={NavLinks.Home} replace />} />
        <Route path={NavLinks.People}>
          <Route path=":selectedPersonSlug?" element={<PeoplePage />} />
        </Route>
        <Route path={NavLinks.Unknown} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
