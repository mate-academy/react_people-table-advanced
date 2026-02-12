import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isPeoplePage = location.pathname.startsWith('/people');

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
              'has-background-grey-lighter': location.pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isPeoplePage,
            })}
            to={{
              pathname: '/people',
              search: searchParams.toString()
                ? `?${searchParams.toString()}`
                : undefined,
            }}
            aria-current={isPeoplePage ? 'page' : undefined}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
