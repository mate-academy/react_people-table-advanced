import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getIsActive = ({
    isActive,
  }: { isActive: boolean }) => (cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  }));

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
            className={getIsActive}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getIsActive}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
