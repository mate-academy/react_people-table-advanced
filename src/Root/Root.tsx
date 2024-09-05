import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RootPathes } from '../types/RootPathes';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={RootPathes.HomePath} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={RootPathes.PseudoHomePath}
            element={<Navigate to={RootPathes.HomePath} replace />}
          />
          <Route path={RootPathes.PeoplePath} element={<PeoplePage />}>
            <Route path={RootPathes.PersonSlugPath} element={<PeoplePage />} />
          </Route>
          <Route
            path={RootPathes.NotFoundPagePath}
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
