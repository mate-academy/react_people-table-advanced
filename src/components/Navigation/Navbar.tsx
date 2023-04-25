import { PageRouters } from '../../types/PageRouters';
import { PageNavLink } from '../Links/PageNavLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to={PageRouters.home} text="Home" />
        <PageNavLink to={PageRouters.people} text="People" />
      </div>
    </div>
  </nav>
);
