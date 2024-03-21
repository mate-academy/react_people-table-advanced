import { NavLink } from 'react-router-dom';
import { getActiveNav } from '../utils/getActiveNav';

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
          <NavLink className={getActiveNav} to="/">
            Home
          </NavLink>

          <NavLink className={getActiveNav} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
