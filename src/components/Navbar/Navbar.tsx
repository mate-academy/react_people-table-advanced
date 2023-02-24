import { useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';

export const Navbar = () => {
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
            to={`/people${location.search}`}
            text="People"
            aria-current="page"
          />
        </div>
      </div>
    </nav>
  );
};
