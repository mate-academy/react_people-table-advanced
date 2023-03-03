import { FC, memo } from 'react';
import { PageNavLink } from '../PageNavLink';

export const Navbar: FC = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" name="Home" />
        <PageNavLink to="/people" name="People" />
      </div>
    </div>
  </nav>
));
