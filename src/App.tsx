import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand container">
        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/people"
        >
          People
        </NavLink>
      </div>
    </nav>

    <main className="section">
      <Outlet />
    </main>
  </div>
);

