import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  const generateNavLinkClassName = (isActive: boolean) => cn(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

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
            className={({ isActive }) => generateNavLinkClassName(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => generateNavLinkClassName(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
