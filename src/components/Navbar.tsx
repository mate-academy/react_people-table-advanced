import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

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
              path === '/'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={
              path === '/people'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
            to="people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
