import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const location = useLocation();
  const isPeoplePath = location.pathname.startsWith('/people');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>

          <NavLink
            aria-current={isPeoplePath ? 'page' : undefined}
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isPeoplePath,
            })}
            to={{ pathname: '/people', search: location.search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
