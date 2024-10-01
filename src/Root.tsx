import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
