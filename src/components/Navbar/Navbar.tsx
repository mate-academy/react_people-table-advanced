import { FC } from 'react';
import { NavigateLink } from './NavigateLink';

export const Navbar: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigateLink title="Home" path="/" />
        <NavigateLink title="People" path="/people" />
      </div>
    </div>
  </nav>
);
