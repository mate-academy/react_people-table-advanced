import { PageNavLink } from '../PageNavLink';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" pageName="Home" />
        <PageNavLink to="people" pageName="People" />
      </div>
    </div>
  </nav>
);
