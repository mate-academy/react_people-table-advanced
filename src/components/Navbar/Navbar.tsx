import { PageNavLink } from '../PageNavLink';

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
          <PageNavLink link="/" text="Home" />
          <PageNavLink link="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
