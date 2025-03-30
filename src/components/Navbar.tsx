import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <SearchLink
            className={`navbar-item ${
              currentPath === '/' ? 'has-background-grey-lighter' : ''
            }`}
            params={{}}
            to={{ pathname: '/' }}
          >
            Home
          </SearchLink>
          <SearchLink
            className={`navbar-item ${
              currentPath.startsWith('/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
            params={{}}
            to={{ pathname: '/people' }}
          >
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};
