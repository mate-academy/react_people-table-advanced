import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const { pathname, search } = useLocation();
  const isHome = pathname === '/';
  const isPeople = pathname.startsWith('/people');

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
            to={{ pathname: '/', search }}
            className={cn('navbar-item', {
              'has-background-grey-lighter': isHome,
            })}
            aria-current={isHome ? 'page' : undefined}
          >
            Home
          </Link>

          <Link
            to={{ pathname: '/people', search }}
            className={cn('navbar-item', {
              'has-background-grey-lighter': isPeople,
            })}
            aria-current={isPeople ? 'page' : undefined}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
