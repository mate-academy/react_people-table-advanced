import { MainNavLink } from './MainNavLink';

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
          <MainNavLink to="/" text="Home" />
          <MainNavLink to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
