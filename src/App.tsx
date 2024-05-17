import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
