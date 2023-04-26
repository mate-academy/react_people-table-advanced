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
        <PageNavLink to={PageRouters.Home} text="Home" />
        <PageNavLink to={PageRouters.People} text="People" />
      </div>
    </div>
  </nav>
);
