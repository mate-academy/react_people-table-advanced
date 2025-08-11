import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { AppRoutes } from './Routes';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<App />}>
          <Route
            path={AppRoutes.HOME_REDIRECT}
            element={<Navigate to={AppRoutes.HOME} replace />}
          />
          <Route index element={<HomePage />} />
          <Route path={AppRoutes.PEOPLE}>
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>
          <Route path={AppRoutes.NOT_FOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
