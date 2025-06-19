import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar" data-cy="nav">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
