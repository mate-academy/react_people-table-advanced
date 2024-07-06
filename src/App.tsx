import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';

import './App.scss';

export const App = () => {
  const detect = useLocation().pathname;

  if (detect === '/home') {
    return <Navigate to="/" />;
  }

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
