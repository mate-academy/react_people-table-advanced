import {
  HashRouter as
  Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path=":slug?" element={<PeoplePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
