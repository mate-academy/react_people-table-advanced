import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClasses} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClasses} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
