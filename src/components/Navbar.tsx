import { NavLink, useLocation } from 'react-router-dom';
import { getClass } from '../utils/getClass';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getClass} to={'/'}>
            Home
          </NavLink>

          <NavLink
            className={getClass}
            to={{ pathname: 'people', search: location.search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
