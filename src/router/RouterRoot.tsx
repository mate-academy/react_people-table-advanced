import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';

export const RouterRoot = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to={'/'} replace />} />

      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
