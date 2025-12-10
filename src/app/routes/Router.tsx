import { Navigate, RouteObject } from 'react-router-dom';
import { App } from '../App';
import { Home, NotFound, PeoplePage } from '@pages/index';
import { Routes } from './routes.enums';

export const Router: RouteObject[] = [
  {
    path: Routes.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: Routes.PEOPLE,
        element: <PeoplePage />,
      },
      {
        path: '/home',
        element: <Navigate to="/" replace />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
