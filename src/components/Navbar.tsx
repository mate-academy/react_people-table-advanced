import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkclass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const NavBar = () => {
  return (
    <nav
      className="navbar is-light is-fixed-top has-shadow"
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkclass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkclass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
