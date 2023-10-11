import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isLocationSelected = (path: string) => {
    return location.pathname === path;
  };

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
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isLocationSelected('/'),
            })}
          >
            Home
          </Link>
          <Link
            to="/people"
            aria-current="page"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isLocationSelected('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
      { }
    </nav>
  );
};
