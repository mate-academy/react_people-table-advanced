import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          {pathname === '/' && <HomePage />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
