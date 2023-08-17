import { NavLink } from 'react-router-dom';
import { setNavLinkClassName } from '../utils/classNamesSetter';

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
            className={({ isActive }) => setNavLinkClassName({ isActive })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) => setNavLinkClassName({ isActive })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
