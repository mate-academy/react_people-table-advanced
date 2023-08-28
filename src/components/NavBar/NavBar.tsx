import { FC } from 'react';
import { PageNavLink } from '../NavLink/PageNavLink';

export const NavBar: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" content="Home" />

          <PageNavLink to="/people" content="People" />
        </div>
      </div>
    </nav>
  );
};
