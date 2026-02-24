import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();

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
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            to={`/people${search}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
