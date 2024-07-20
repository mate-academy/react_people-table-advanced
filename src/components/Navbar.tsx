import { NavLink } from 'react-router-dom';
import { getClassForLink } from '../services/functions';

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
          <NavLink className={getClassForLink} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={getClassForLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
