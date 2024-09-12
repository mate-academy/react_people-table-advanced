import { NavLink } from 'react-router-dom';
import { URLS } from '../enums/URLS';
import { isLinkActive } from '../helpers/helpers';

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
          <NavLink className={isLinkActive} to={URLS.home}>
            Home
          </NavLink>

          <NavLink className={isLinkActive} to={URLS.people}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
