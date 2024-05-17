import { NavLink } from 'react-router-dom';
import { getActiveClassName } from '../utils/getActiveClassName';

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
          <NavLink className={getActiveClassName} to="/">
            Home
          </NavLink>

          <NavLink
            className={getActiveClassName}
            aria-current="page"
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
