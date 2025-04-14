import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();

  const getLinkClass = (path: string) =>
    classNames('navbar-item', {
      'has-background-grey-lighter':
        pathname === path || pathname.startsWith(path + '/'),
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className={getLinkClass('/')}>
            Home
          </Link>

          <Link to="/people" className={getLinkClass('/people')}>
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
