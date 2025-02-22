import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavbarItemClassName = (isActive: boolean) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const Navigation = () => {
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
            className={({ isActive }) => getNavbarItemClassName(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="people"
            className={({ isActive }) => getNavbarItemClassName(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
