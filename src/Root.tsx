import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { WAYS } from './utils/ways';
import { App } from './App';
import HomePage from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path={WAYS.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={`${WAYS.PEOPLE}/:slugs?`} element={<PeoplePage />} />
          <Route path="home" element={<Navigate to={WAYS.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
