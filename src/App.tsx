import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { DefaultLayout } from './layouts/default.layout';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people/:selectedPerson?" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
