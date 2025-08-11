import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import React from 'react';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={'/home'} element={<Navigate to={'/'} replace />} />

          <Route path={'/people'}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path={'*'} element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
