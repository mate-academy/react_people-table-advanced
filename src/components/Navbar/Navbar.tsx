import { FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';

export const Navbar: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const parentPath = location.pathname;

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
              pathname: parentPath,
              search: searchParams.toString(),
            }}
            text="People"
          />
        </div>
      </div>
    </nav>
  );
};
