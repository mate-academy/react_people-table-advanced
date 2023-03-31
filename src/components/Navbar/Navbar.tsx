import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const selectedNavLink = ({ isActive } : { isActive: boolean }) => cn(
  'navbar-item',
  { 'has-background-grey-lighter': isActive },
);

const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" className={selectedNavLink}>
          Home
        </NavLink>

        <NavLink
          to="/people"
          aria-current="page"
          className={selectedNavLink}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
