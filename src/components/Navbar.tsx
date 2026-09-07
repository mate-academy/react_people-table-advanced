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
            className={
              location.pathname === '/'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            Home
          </Link>

          <Link
            to={`/people${location.search}`}
            className={
              location.pathname.startsWith('/people')
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
