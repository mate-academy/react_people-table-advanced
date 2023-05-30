import { MenuLink } from './MenuLink';

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
          <MenuLink to="/" text="Home" />
          <MenuLink to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
