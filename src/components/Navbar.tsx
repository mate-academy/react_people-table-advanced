import { useLocation } from 'react-router-dom';
import { PageNavLink } from './PageNavLink';

export const Navbar: React.FC = () => {
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
          <PageNavLink to="/" text="Home" />
          <PageNavLink
            to={{
              pathname: '/people',
              search,
            }}
            text="People"
          />
        </div>
      </div>
    </nav>
  );
};
