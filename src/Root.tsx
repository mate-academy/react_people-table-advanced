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
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />

          <Route index element={<HomePage />} />

          <Route path="people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
