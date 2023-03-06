import { NavBarLink } from '../NavBarLink';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavBarLink to="/" name="Home" />
        <NavBarLink to="/people" name="People" />
      </div>
    </div>
  </nav>
);
