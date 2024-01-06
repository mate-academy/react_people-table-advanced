import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { AppRoute } from './enums';
import { HomePage, PeoplePage, NotFoundPage } from './pages';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={AppRoute.ROOT} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={AppRoute.PEOPLE}>
          <Route path={AppRoute.PERSON} element={<PeoplePage />} />
        </Route>

        <Route
          path={AppRoute.HOME}
          element={<Navigate to={AppRoute.ROOT} replace />}
        />

        <Route path={AppRoute.ANY} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
