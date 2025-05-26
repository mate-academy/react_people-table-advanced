import { Link, useLocation } from 'react-router-dom';

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
          <Link
            to="/"
            className={`navbar-item ${
              location.pathname === '/' ? 'has-background-grey-lighter' : ''
            }`}
            data-cy="Nav-Home"
          >
            Home
          </Link>

          <Link
            to="/people"
            className={`navbar-item ${
              location.pathname.startsWith('/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
            data-cy="Nav-People"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
