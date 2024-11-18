import { lazy } from 'react';
import { PeopleProvider } from '../context/PeopleContext';

const LazyPeoplePage = lazy(() => import('../pages/PeoplePage/PeoplePage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const PeoplePage = () => (
  <PeopleProvider>
    <LazyPeoplePage />
  </PeopleProvider>
);

export const Routing = {
  PeoplePage,
  HomePage,
  NotFoundPage,
};
