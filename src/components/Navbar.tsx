import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../helper/getLinkClass';

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
          <NavLink
            to="/"
            className="navbar-item"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
