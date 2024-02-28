import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { NotFoundPage } from './components/NotFound';
import { PeoplePage } from './components/PeoplePage';
import { Home } from './components/Home';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
