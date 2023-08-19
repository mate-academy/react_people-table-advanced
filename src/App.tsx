import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <Navbar />
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
