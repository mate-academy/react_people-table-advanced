import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
  cn('navbar-item', isActive && 'has-background-grey-lighter');

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
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>

          <NavLink aria-current="page" className={getLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
