import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/people"
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
