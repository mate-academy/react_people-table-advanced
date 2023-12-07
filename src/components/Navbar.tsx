import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isActiveClass = ({ isActive }: { isActive: boolean }) => classNames(
    'navbar-item', {
      'has-background-grey-lighter': isActive,
    },
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={isActiveClass}>
            Home
          </NavLink>

          <NavLink
            to="/people"
            aria-current="page"
            className={isActiveClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
