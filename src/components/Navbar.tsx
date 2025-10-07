import cn from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

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
              'has-background-grey-lighter': location.pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
