import { NavLink } from 'react-router-dom';
import cn from 'classnames';

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
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) =>
              cn('navbar-item', { 'has-background-grey-lighter': isActive })
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
