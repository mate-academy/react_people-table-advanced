import { PageNaveLink } from '../PageNavLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNaveLink to="/" text="Home" />
        <PageNaveLink to="/people" text="People" />
      </div>
    </div>
  </nav>
);
