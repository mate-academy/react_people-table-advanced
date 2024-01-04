import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

export const NavBar: FC = () => {
  const isActiveLink = (isActive: boolean) => cn(
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
            className={({ isActive }) => isActiveLink(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => isActiveLink(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
