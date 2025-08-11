import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotPageFound } from './components/NoPageFound';

export enum AppRoutes {
  Root = '/',
  Home = 'home',
  People = 'people',
  PersonId = ':personId?',
  NoPage = '*',
}

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path={AppRoutes.Root} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={AppRoutes.Home} element={<Navigate to=".." replace />} />
        <Route path={AppRoutes.People}>
          <Route path={AppRoutes.PersonId} element={<PeoplePage />} />
        </Route>
        <Route path={AppRoutes.NoPage} element={<NotPageFound />} />
      </Route>
    </Routes>
  </Router>
);
