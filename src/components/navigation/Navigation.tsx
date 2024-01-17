import { NavLink } from 'react-router-dom';
import { getActiveClass } from '../../helpers/getActiveClass';

export const Navigation = () => (
  <>
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
            className={getActiveClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={getActiveClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  </>
);
