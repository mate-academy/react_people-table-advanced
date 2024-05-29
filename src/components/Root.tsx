import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { ROUTES } from '../utils/routes';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.HOME_PAGE} element={<Navigate to="/" />} />
          <Route path={ROUTES.PEOPLE} element={<PeoplePage />}>
            <Route path={ROUTES.SLUG} element={<PeoplePage />} />
          </Route>
          <Route path={ROUTES.WILDCARD} element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
