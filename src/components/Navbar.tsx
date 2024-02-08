import { NavLink, useSearchParams } from 'react-router-dom';
import { getNavLinkClassnames } from '../utils/getNavLinkClassnames';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClassnames} to="/">
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClassnames}
            to={`/people?${searchParams.toString()}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
