import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PATHS } from './utils/const';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={PATHS.home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={PATHS.home} replace />} />
        <Route path={`${PATHS.people}/:slug?`} element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
