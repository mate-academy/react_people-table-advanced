import { useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';

export const Navbar = () => {
  const { search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink
            to={{
              pathname: '/',
              search: '',
            }}
            text="Home"
          />
          <PageNavLink
            to={{
              pathname: '/people',
              search,
            }}
            text="People"
            aria-current="page"
          />
        </div>
      </div>
    </nav>
  );
};
