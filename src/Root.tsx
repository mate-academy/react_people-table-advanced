import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFound } from './pages/NotFound';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route index path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
