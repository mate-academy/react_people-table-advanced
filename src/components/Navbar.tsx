import { NavigationLink } from './NavigationLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink path="home" />
        <NavigationLink path="people" />
      </div>
    </div>
  </nav>
);
