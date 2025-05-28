import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const { search } = useLocation();

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
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to={{
              pathname: '/people',
              search: search || '',
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
