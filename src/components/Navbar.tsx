import { NavLinks } from './NavLinks';

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
          <NavLinks to="/" text="Home" />
          <NavLinks to="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
