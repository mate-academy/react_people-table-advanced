import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';
import { App } from './App';
import { Paths } from './types/Paths';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={Paths.Home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={Paths.HomePage} element={<Navigate to="/" replace />} />
        <Route path={Paths.People} element={<PeoplePage />}>
          <Route index />
          <Route path={Paths.PersonDetail} />
        </Route>
        <Route path={Paths.PageNotFound} element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
