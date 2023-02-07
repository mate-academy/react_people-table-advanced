import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const Navbar = memo(() => {
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
          <PageNavLink to="/" text="Home" />
          <PageNavLink
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
});
