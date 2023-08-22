import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { InvalidPage } from './components/InvalidPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug" />
        </Route>
        <Route path="*" element={<InvalidPage />} />
      </Route>
    </Routes>
  </Router>
);
