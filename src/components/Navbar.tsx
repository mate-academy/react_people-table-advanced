import { NavbarLink } from './NavbarLink';

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
          <NavbarLink path="/" text="Home" />
          <NavbarLink path="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
