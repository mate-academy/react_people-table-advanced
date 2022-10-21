import { PageNavLink } from '../PageNavLink';

export const MainNav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink text="Home" to="/" />
        <PageNavLink text="People" to="people" />
      </div>
    </div>
  </nav>
);
