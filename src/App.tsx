import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to={'..'} replace />;
  }

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
