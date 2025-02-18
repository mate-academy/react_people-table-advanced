import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { ROUTES } from './config/routes';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={ROUTES.HOME} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={ROUTES.HOME} />} />
        <Route path={ROUTES.PEOPLE}>
          <Route path=":peopleSlug?" element={<PeoplePage />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
