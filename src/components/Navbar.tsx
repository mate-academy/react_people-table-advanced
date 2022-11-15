import { NavbarLink } from './NavbarLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavbarLink to="/" text="Home" />
        <NavbarLink to="/people" text="People" />

      </div>
    </div>
  </nav>
);
