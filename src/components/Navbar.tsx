import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

export const NavBar: FC = () => {
  const getLinkClasses = (isActive: boolean) => cn(
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
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
