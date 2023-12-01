import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../helper/getLinkClass';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-light is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
