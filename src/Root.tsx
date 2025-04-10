import {
  Route,
  Routes,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFoundPage';
import { App } from './App';
import { PersonPage } from './pages/PersonPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />
        <Route path="/people" element={<PersonPage />}>
          <Route path=":slug?" element={<PersonPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
