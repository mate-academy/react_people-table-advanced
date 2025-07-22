import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation().pathname;

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
            to={'/'}
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.endsWith('/'),
            })}
          >
            Home
          </NavLink>
          <NavLink
            to={'/people'}
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.startsWith('/people'),
            })}
            aria-current="page"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
