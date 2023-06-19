import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => classNames('navbar-item',
            {
              'has-background-grey-lighter': isActive,
            })}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames('navbar-item',
            {
              'has-background-grey-lighter': isActive,
            })}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
