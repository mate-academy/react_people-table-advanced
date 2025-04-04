import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = () => {
  const { pathname } = useLocation();

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
              'navbar-item has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item', {
              'navbar-item has-background-grey-lighter':
                pathname.startsWith('/people'),
            })}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
