import { NavLink } from 'react-router-dom';

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
          <NavLink
            to="/"
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) =>
              'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
