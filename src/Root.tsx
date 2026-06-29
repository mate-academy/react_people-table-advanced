import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './components/Pages/PageNotFound';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<PageNotFound />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />
        <Route path="people/:peopleSlug?" element={<PeoplePage />} />
      </Route>
    </Routes>
  </Router>
);
