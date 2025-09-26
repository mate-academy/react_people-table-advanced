import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

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
            to={{
              pathname: '/',
              search: getSearchWith(searchParams, {}),
            }}
            className={`navbar-item ${isHome ? ACTIVE_NAV_LINK_CLASS : ''}`}
          >
            Home
          </Link>

          <Link
            to={{
              pathname: '/people',
              search: getSearchWith(searchParams, {}),
            }}
            className={`navbar-item ${isPeople ? ACTIVE_NAV_LINK_CLASS : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
