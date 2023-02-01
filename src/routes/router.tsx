import { createHashRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { PeoplePage } from '../components/PeoplePage';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="title">Page not found</h1>,
    children: [
      {
        index: true,
        element: <h1 className="title">Home Page</h1>,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'people',
        children: [
          { index: true, element: <PeoplePage /> },
          { path: ':slug', element: <PeoplePage /> },
        ],
      },
    ],
  },
]);
