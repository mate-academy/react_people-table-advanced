import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: 'people',
              search: location.search,
            }}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
