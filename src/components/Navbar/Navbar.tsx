import { NavbarLink } from '../NavbarLink/NavbarLink';

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
          <NavbarLink link="/" title="Home" />
          <NavbarLink link="/people" title="People" />
        </div>
      </div>
    </nav>
  );
};
