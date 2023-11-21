import { Navigation } from '../Navigation/Navigation';

export const Header = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <Navigation />
  </nav>
);
