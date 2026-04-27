import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavClasses = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
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
          <NavLink className={getNavClasses} to="/">
            Home
          </NavLink>

          <NavLink className={getNavClasses} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
