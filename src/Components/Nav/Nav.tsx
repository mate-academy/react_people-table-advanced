import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Nav = () => (
  <div className="navbar">
    <div className="navbar-brand">
      <NavLink
        type="button"
        to="/"
        className={({ isActive }) => classNames(
          'navbar-item',
          'is-tab',
          { 'is-active': isActive },
        )}
      >
        Home
      </NavLink>

      <NavLink
        type="button"
        to="/people"
        className={({ isActive }) => classNames(
          'navbar-item',
          'is-tab',
          { 'is-active': isActive },
        )}
      >
        People
      </NavLink>
    </div>
  </div>
);
