import { PageNavLink } from './PageNavLink';

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
          <PageNavLink to="/" content="Home" />
          <PageNavLink to="/people" content="People" />
        </div>
      </div>
    </nav>
  );
};
