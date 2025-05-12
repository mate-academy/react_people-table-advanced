import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const ACTIVE_NAV_CLASS = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(path);
  };

  return (
    <nav
      className="navbar is-link mb-4"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <SearchLink
            to="/"
            params={{}}
            className={classNames('navbar-item', {
              [ACTIVE_NAV_CLASS]: isActive('/'),
            })}
          >
            Home
          </SearchLink>

          <SearchLink
            to="/people"
            params={{}}
            className={classNames('navbar-item', {
              [ACTIVE_NAV_CLASS]: isActive('/people'),
            })}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
