import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

const getCurrentPage = (pathname: string, path: string) => {
  return pathname === path ? 'page' : undefined;
};

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
          <NavLink
            to="/"
            className={getLinkClass}
            aria-current={getCurrentPage(pathname, '/')}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getLinkClass}
            aria-current={getCurrentPage(pathname, '/people')}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
