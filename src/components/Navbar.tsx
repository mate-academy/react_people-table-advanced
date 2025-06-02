import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;

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
            className={`navbar-item ${pathName === '/' && 'has-background-grey-lighter'}`}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={`navbar-item ${pathName.startsWith('/people') && 'has-background-grey-lighter'}`}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
