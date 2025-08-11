import cn from 'classnames';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';

export const Navbar = () => {
  const getClassName = ({ isActive }: NavLinkRenderProps): string => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
