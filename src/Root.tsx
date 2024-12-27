import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { PeoplePage } from './pages/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to=".." replace />} />

        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
