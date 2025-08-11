import { NavLink } from 'react-router-dom';
import { setLinkClass } from '../utils/setLinkClass';

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
          <NavLink className={setLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={setLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
