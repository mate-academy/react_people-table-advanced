import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { PATHS } from './types/PATHS';
//components
import { App } from './App';
import People from './pages/People';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';

const { ROOT, HOME, PEOPLE, PERSON, PAGE_NOT_FOUND } = PATHS;

export const Root = () => (
  <Router>
    <Routes>
      <Route path={ROOT} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={HOME} element={<Navigate to={ROOT} replace />} />
        <Route path={PEOPLE}>
          <Route path={PERSON} element={<People />} />
        </Route>

        <Route path={PAGE_NOT_FOUND} element={<Page404 />} />
      </Route>
    </Routes>
  </Router>
);
