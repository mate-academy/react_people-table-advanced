import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Routes as AppRoutes } from './types/Routes';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={AppRoutes.HOME}
            element={<Navigate to={AppRoutes.HOME} replace />}
          />
          <Route path={AppRoutes.PEOPLE}>
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
