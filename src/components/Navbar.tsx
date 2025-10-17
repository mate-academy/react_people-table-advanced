import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

  const search = searchParams.toString();
  const peopleLink = search
    ? { pathname: '/people', search: `?${search}` }
    : '/people';

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
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item', {
              'has-background-grey-lighter': isPeople,
            })}
            to={peopleLink}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
