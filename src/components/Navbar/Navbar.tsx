import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: FC = () => (
  <nav className="navbar is-fixed-top has-background-light" data-cy="nav">
    <div className="navbar-menu">
      <div className="navbar-start">
        <NavLink
          to="/"
          className={({ isActive }) => (
            classNames(
              'navbar-item',
              { isActive },
            )
          )}
        >
          Home
        </NavLink>

        <NavLink
          to="/tabs"
          className={({ isActive }) => (
            classNames(
              'navbar-item',
              { isActive },
            )
          )}
        >
          Tabs
        </NavLink>
      </div>
    </div>
  </nav>
);
