import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const NavBar = () => {
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
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
