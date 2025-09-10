import classNames from 'classnames';
import { Link, matchPath, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();

  const isTabActive =
    matchPath({ path: '/people/:slug', end: true }, pathname) ||
    matchPath({ path: '/people', end: true }, pathname);

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
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isTabActive,
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
