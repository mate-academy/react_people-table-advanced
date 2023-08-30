import { NavLink, useSearchParams } from 'react-router-dom';
import { getNavLinkClass } from '../utils/getNavLinkClass';

export const AppNavigation: React.FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="container">
        <li className="navbar-brand">
          <NavLink
            className={getNavLinkClass}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={getNavLinkClass}
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
