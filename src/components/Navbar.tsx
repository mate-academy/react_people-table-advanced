import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            // eslint-disable-next-line max-len
            className={({ isActive }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive })}
            to="/"
          >
            Home

          </NavLink>

          <NavLink
            aria-current="page"
            // eslint-disable-next-line max-len
            className={({ isActive }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
