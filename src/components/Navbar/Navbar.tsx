import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
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
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getNavLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
