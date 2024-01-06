import { NavLink } from 'react-router-dom';
import { AppRoute } from '../enums';
import { getLinkClass } from '../utils';

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
          <NavLink to={AppRoute.ROOT} className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to={AppRoute.PEOPLE} className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
