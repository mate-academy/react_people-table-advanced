import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { PageNotFound } from './page/PageNotFound';
import { HomePageTitle } from './page/HomePageTitle';
import { PeoplePage } from './components/PeoplePage';
import { Routes as AppRoutes } from './enum/routes.enum';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.Home} element={<App />}>
          <Route path={AppRoutes.PageNotFound} element={<PageNotFound />} />

          <Route index element={<HomePageTitle />} />

          <Route path={AppRoutes.People}>
            <Route path={AppRoutes.PeopleWithSlug} element={<PeoplePage />} />
          </Route>

          <Route path={AppRoutes.HomeRedirect} element={<Navigate to={AppRoutes.Home} replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
