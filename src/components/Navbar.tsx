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
            className={({ isActive }) => {
              return `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            aria-current="page"
            className={({ isActive }) => {
              return `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
