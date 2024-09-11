import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { eRoutes } from './utils/eRoutes';
import { App } from './App';
import HomePage from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path={eRoutes.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={`${eRoutes.PEOPLE}/:slugs?`} element={<PeoplePage />} />
          <Route path="home" element={<Navigate to={eRoutes.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
