import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();

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
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={`navbar-item ${pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
