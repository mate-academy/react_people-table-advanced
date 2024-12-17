import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../utils/utils';

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
            className={({ isActive }) =>
              getLinkClass(
                isActive,
                'navbar-item',
                'has-background-grey-lighter',
              )
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            aria-current="page"
            className={({ isActive }) =>
              getLinkClass(
                isActive,
                'navbar-item',
                'has-background-grey-lighter',
              )
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
