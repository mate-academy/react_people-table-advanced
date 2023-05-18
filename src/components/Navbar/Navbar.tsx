import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NavbarLink } from './NavbarLink';

export const Navbar: FC = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavbarLink to="/" text="Home" />
          <NavbarLink
            to={{
              pathname: '/people',
              search: location.search,
            }}
            text="People"
          />
        </div>
      </div>
    </nav>
  );
};
