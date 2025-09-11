import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

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
          <NavLink
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.pathname === '/',
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={classNames('navbar-item', {
              'has-background-grey-lighter':
                location.pathname.startsWith('/people'),
            })}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
