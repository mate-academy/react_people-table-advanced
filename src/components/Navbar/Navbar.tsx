import classNames from 'classnames';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { RoutesParts } from '../../types/RoutesURLParts';

export const Navbar = () => {
  const isActiveNavLink = ({ isActive }: NavLinkRenderProps) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to={RoutesParts.root} className={isActiveNavLink}>
            Home
          </NavLink>

          <NavLink to={RoutesParts.people} className={isActiveNavLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
