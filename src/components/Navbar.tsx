import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getActiveNavBarLink = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

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
          <NavLink to="/" className={getActiveNavBarLink}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: location.search,
            }}
            className={getActiveNavBarLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
