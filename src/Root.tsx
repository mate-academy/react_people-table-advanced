import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';

import HomePage from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default Root;
