import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './path/HomePage';
import { NotFound } from './path/NotFoundPage';
import { PeoplePage } from './path/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route path=":slug?" element={<PeoplePage />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
