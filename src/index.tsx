import { createRoot } from 'react-dom/client';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },

      {
        path: 'people/:slug?',
        element: <PeoplePage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <RouterProvider router={router} />,
);
