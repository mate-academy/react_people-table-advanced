import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import {
  HomePageRedirect,
} from './components/HomePageRedirect/HomePageRedirect';
import {
  PageNotFoundRedirect,
} from './pages/PageNotFoundRedirect/PageNotFoundRedirect';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const router = createHashRouter([{
  path: '/',
  element: <App />,
  errorElement: <PageNotFoundRedirect />,
  children: [{
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePageRedirect />,
  },
  {
    path: '/people',
    element: <PeoplePage />,
    children: [{
      path: '/people/:slug',
      element: <PeoplePage />,
    }],
  },
  {
    path: '/not-found',
    element: <PageNotFound />,
  }],
}]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root'),
);
