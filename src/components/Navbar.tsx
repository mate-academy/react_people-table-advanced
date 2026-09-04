import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

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
            className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
