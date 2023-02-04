import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className={classNames(
              'navbar-item',
              {
                'has-background-grey-lighter':
                  location.pathname === '/',
              },
            )}
            href="#/"
          >
            Home
          </a>

          <a
            aria-current="page"
            className={classNames(
              'navbar-item',
              {
                'has-background-grey-lighter':
                  location.pathname.startsWith('/people'),
              },
            )}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
