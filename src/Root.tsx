import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { PeopleProvider } from './store/PeopleContext';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:name" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
