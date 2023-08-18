import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const isActiveTab = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const Navbar = () => {
  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={isActiveTab}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={isActiveTab}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
