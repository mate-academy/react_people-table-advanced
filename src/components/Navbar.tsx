import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const navIsActive = ({ isActive }: { isActive: boolean }) => classNames(
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
          <NavLink className={navIsActive} to="/">
            Home
          </NavLink>

          <NavLink
            className={navIsActive}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
