import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isHomeActive = currentPath === '/';
  const isPeopleActive = currentPath.startsWith('/people');

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
            className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current={isPeopleActive ? 'page' : undefined}
            className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
            to={{
              pathname: '/people',
              search: location.search,
            }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
