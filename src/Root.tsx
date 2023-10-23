import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { Page404 } from './pages/Page404';

export const Root: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<App />}
    >
      <Route
        index
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
          path=":userSlug"
          element={<PeoplePage />}
        />
      </Route>

      <Route
        path="*"
        element={<Page404 />}
      />
    </Route>
  </Routes>
);
