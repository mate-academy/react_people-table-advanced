import { NavLink, useSearchParams } from 'react-router-dom';
import { getNavLinkClassNames } from '../../utils/getNavLinkClassNames';

export const NavigationBar: React.FC = () => {
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
          <NavLink
            className={getNavLinkClassNames}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClassNames}
            to={
              {
                pathname: '/people',
                search: `?${searchParams.toString()}`,
              }
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
