import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Link
          to="/"
          className={`navbar-item ${isActive('/') ? 'has-background-grey-lighter' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/people"
          className={`navbar-item ${isActive('/people') ? 'has-background-grey-lighter' : ''}`}
        >
          People
        </Link>
      </div>
    </nav>
  );
};
