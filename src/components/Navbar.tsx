import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import { getLinkClass, useOptionForLink } from '../services/people';

export const Navbar = memo(function NavbarComponent() {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={useOptionForLink(`/people`)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
});
