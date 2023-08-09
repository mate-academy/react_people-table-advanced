import { NavLink } from 'react-router-dom';
import { activeLink } from '../../utils/activeLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={activeLink} to="..">
          Home
        </NavLink>

        <NavLink className={activeLink} to="people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
