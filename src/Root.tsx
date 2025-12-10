import { HashRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { Router } from './app/routes';

const AppRoutes = () => useRoutes(Router);

export const Root = () => (
  <HashRouter>
    <AppRoutes />
  </HashRouter>
);
