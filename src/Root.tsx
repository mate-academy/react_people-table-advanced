import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/home';
import { PageNotFound } from './pages/pageNotFound';
import { PeoplePage } from './pages/peoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
