import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeopleProvider } from './store/PeopleContext';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>

          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
