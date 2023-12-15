import './App.scss';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
