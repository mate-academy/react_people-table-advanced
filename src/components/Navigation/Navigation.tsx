import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClassname = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClassname} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkClassname} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
