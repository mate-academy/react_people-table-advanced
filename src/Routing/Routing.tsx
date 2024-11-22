import { lazy } from 'react';

const PeoplePage = lazy(() => import('../pages/PeoplePage/PeoplePage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

export const Routing = {
  PeoplePage,
  HomePage,
  NotFoundPage,
};
