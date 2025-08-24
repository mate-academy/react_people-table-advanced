import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const { pathname, search } = location;

  const isHomeActive = pathname === '/';
  const isTabsActive = pathname.startsWith('/people');

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
              'has-background-grey-lighter': isHomeActive,
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isTabsActive,
            })}
            to={{ pathname: '/people', search }} // ✅ сохраняем параметры
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
