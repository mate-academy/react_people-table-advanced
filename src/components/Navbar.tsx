import { NavbarItem } from './NavbarItem';

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
          <NavbarItem to="/" title="Home" />
          <NavbarItem to="/people" title="People" />
        </div>
      </div>
    </nav>
  );
};
