import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const setActive = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

const Header = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>

        <NavLink to="/people" className={setActive}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Header;
