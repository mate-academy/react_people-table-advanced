import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getClassLink = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

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
          <NavLink
            to="/"
            className={getClassLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getClassLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
