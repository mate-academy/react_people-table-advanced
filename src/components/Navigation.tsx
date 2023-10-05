import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const IsLinkActive = ({ isActive }: { isActive: boolean }) => cn('navbar-item',
  { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" className={IsLinkActive}>
            Home
          </NavLink>

          <NavLink to="/people" className={IsLinkActive}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
