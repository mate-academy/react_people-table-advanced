import { NavLink } from 'react-router-dom';
import getActiveNavLink from '../utils/getActiveNavLink';

export default function Navbar() {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getActiveNavLink}>
            Home
          </NavLink>

          <NavLink to="/people" className={getActiveNavLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
