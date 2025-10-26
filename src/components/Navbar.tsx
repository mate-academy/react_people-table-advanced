import classNames from 'classnames';
// Navbar.tsx
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const keepPeopleSearch = location.pathname.startsWith('/people')
    ? location.search
    : '';

  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={navigationClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={navigationClass}
            to={{ pathname: '/people', search: keepPeopleSearch }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
