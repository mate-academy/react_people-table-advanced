import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getIsActive = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => (
  <>
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getIsActive}>
            Home
          </NavLink>

          <NavLink to="people" className={getIsActive}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  </>
);
