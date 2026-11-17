import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isPeoplePage =
    location.pathname === '/people' || location.pathname.startsWith('/people/');

  const peopleSearch = isPeoplePage ? location.search : '';

  return (
    <nav data-cy="nav" className="navbar has-shadow">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link
            to="/"
            className={
              'navbar-item ' +
              (!isPeoplePage && location.pathname === '/'
                ? 'has-background-grey-lighter'
                : '')
            }
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: peopleSearch,
            }}
            className={
              'navbar-item ' +
              (isPeoplePage ? 'has-background-grey-lighter' : '')
            }
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
