import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Status = { isActive: boolean };

const getNavLinkClasses = (status: Status) =>
  classNames('navbar-item', { 'has-background-grey-lighter': status.isActive });

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
          <NavLink to="/" className={getNavLinkClasses}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: 'people',
              search: location.search,
            }}
            className={getNavLinkClasses}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
