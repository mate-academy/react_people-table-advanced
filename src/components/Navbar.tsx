import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
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
            className={
              location.pathname === '/'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/"
          >
            Home
          </Link>

          <Link
            className={
              isPeople
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to={
              isPeople
                ? { pathname: '/people', search: location.search }
                : '/people'
            }
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
