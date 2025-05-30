import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

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
            className={`navbar-item ${isHome ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${isPeople ? 'has-background-grey-lighter' : ''}`}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
