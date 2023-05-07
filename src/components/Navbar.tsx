import { FC } from 'react';
import { PageNavLink } from './PageNavLink';

export const Navbar: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink path="/" text="Home" className="navbar-item" />
        <PageNavLink path="/people" text="People" className="navbar-item" />
      </div>
    </div>
  </nav>
);
