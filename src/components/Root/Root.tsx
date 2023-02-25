import React from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { App } from '../../App';
import { HomePage } from '../../pages/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PeoplePage } from '../../pages/PeoplePage';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route path="people">
            <Route
              index
              element={<PeoplePage />}
            />
            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};
