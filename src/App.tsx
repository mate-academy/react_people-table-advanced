import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import { getLinkClass } from './utils/getLinkClass';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={getLinkClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">

        <Outlet />
      </div>
    </main>
  </div>
);
