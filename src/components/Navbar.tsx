import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();

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
            className={classNames('navbar-item ', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={classNames('navbar-item ', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to="people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
