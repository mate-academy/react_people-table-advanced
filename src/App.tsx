import { Navigate, createHashRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Home from './pages/HomePage';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import PeoplePage from './pages/People';

const router = createHashRouter([{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Navigate to="/" replace /> },
    {
      path: '/people',
      element: <PeoplePage />,
      children: [
        { path: ':slug', element: <PeoplePage /> },
      ],
    },
  ],
}]);

function App() {
  return (

    <>
      <div data-cy="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
