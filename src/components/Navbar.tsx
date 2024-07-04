import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getNavClass = ({ isActive }: { isActive: boolean }) => {
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
          <NavLink className={getNavClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={getNavClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
