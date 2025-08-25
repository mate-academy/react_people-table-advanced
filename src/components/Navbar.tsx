import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }

    return location.pathname.startsWith(path);
  };

  const peopleLink = location.pathname.startsWith('/people')
    ? `/people${location.search}`
    : '/people';

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
            className={`navbar-item ${isActive('/') ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${isActive('/people') ? 'has-background-grey-lighter' : ''}`}
            to={peopleLink}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
