import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const { pathname: path } = useLocation();

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
            className={cn('navbar-item', {
              'has-background-grey-lighter': path === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={cn('navbar-item', {
              'has-background-grey-lighter': path === '/people',
            })}
            to="people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
