import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

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
          <NavLink className={getLinkClassName} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinkClassName}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
