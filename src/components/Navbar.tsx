import { NavLink } from "react-router-dom";
import { getLinkActiveClass } from '../utils/getLinkActiveClass';

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
          <NavLink className={getLinkActiveClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkActiveClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
