import {
  Route,
  Routes,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Router>
);
