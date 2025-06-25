import { createHashRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'people/:personSlug?',
        element: <PeoplePage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },

      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
