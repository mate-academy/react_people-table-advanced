import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { PeopleProvider } from './store/PeopleContext';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="people/:slug?" element={<PeoplePage />} />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
