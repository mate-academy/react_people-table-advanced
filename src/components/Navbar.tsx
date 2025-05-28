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
            className={({ isActive }) =>
              isActive
                ? 'navbar-item is-active has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'navbar-item is-active has-background-grey-lighter'
                : 'navbar-item'
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
