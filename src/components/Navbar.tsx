import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getNavLinkClass } from '../utils/helpers';

export const Navbar = memo(() => {
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
            to="/"
            className={getNavLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to={{ pathname: 'people', search }}
            className={getNavLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
});
