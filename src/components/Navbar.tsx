import { NavLink } from 'react-router-dom';
import { getNavClassNames } from '../utils/GetNavClassNames';
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
          <NavLink className={getNavClassNames} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getNavClassNames}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
