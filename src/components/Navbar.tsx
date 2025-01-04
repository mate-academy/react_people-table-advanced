import { Link, useLocation } from 'react-router-dom';
import cN from 'classnames';

export const Navbar = () => {
  const { pathname, search } = useLocation();

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
            className={cN('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            className={cN('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to={`/people${search}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
