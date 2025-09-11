import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const getNavItemClass = (isActive: boolean) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });
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
            to="/"
            className={({ isActive }) => getNavItemClass(isActive)}
            end
          >
            Home
          </NavLink>

          <NavLink
            to={`/people${location.search}`}
            className={({ isActive }) => getNavItemClass(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
