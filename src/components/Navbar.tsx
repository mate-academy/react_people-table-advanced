import { NavLink } from 'react-router-dom';

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
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
