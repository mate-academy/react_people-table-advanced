import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from './functions/getNavLinkClass';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>

        <NavLink to="/people" className={getNavLinkClass}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
