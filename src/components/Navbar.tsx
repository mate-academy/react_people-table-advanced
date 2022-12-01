import { FC } from 'react';
import { NavbarItem } from './NavbarItem';

export const Navbar: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavbarItem to="/" text="Home" />
        <NavbarItem to="/people" text="People" />
      </div>
    </div>
  </nav>
);
