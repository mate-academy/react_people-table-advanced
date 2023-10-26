import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = (isActive: boolean) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const NavBar = () => {
  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to=".."
            end
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="people"
            className={({ isActive }) => getLinkClass(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
