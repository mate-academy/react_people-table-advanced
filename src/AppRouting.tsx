import { RouterProvider, createHashRouter } from 'react-router-dom';
import { PageNotFound } from './components/Pages/PageNotFound';
import { App } from './App';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { HomeRedirect } from './components/HomeRedirect';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <HomeRedirect />,
      },
      {
        path: '/people',
        element: <PeoplePage />,
      },
      {
        path: '/people/:personSlug',
        element: <PeoplePage />,
      },
      {
        path: '/*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export const AppRouting:React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
