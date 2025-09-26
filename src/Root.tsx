import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slugPerson" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
