import {
  HashRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import { App } from './App';
import { PeoplePage } from './components/Pages/PeoplePage';
import { NotFoundPage } from './components/Pages/NotFaundPage';
import { HomePage } from './components/Pages/HomePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <App />
    </Router>
  );
};
