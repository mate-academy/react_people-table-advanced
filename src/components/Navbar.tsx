import { NavLink } from 'react-router-dom';
import { isActiveClass } from '../utils/activeClass';

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
            className={({ isActive }) =>
              isActiveClass(
                isActive,
                'navbar-item',
                'has-background-grey-lighter',
              )
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActiveClass(
                isActive,
                'navbar-item',
                'has-background-grey-lighter',
              )
            }
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
