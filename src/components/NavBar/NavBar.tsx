import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const targetLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={targetLinkClass} end to="/">
          Home Page
        </NavLink>

        <NavLink className={targetLinkClass} to="/people">
          People Page
        </NavLink>
      </div>
    </div>
  </nav>
);
