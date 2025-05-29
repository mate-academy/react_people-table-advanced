import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getActiveClassName = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'navbar-item has-background-grey-lighter': isActive,
  });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getActiveClassName} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getActiveClassName}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
