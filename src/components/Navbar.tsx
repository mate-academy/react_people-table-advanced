import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Preserve existing query string when going to /people
  const peopleTo = useMemo(() => {
    const qs = location.search || '';

    return `/people${qs}`;
  }, [location.search]);

  const isHome = currentPath === '/';
  const isPeople = currentPath.startsWith('/people');

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
              'has-background-grey-lighter': isHome,
            })}
            to="/"
            aria-current={isHome ? 'page' : undefined}
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item', {
              'has-background-grey-lighter': isPeople,
            })}
            to={peopleTo}
            aria-current={isPeople ? 'page' : undefined}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
