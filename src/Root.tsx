import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Router>
);
