import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="people">
          <Route
            index
            element={<PeoplePage />}
          />
          <Route
            path=":personId"
            element={<PeoplePage />}
          />
        </Route>

        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Route>
    </Routes>
  </Router>
);
