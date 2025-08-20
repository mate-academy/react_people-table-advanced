import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

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
            end
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => {
              return classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
            to={
              location.pathname.startsWith('/people')
                ? { pathname: '/people', search: location.search }
                : '/people'
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
