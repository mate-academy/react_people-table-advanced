import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  if (isHome) {
    return <Navigate to="/" />;
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
