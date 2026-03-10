import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

const ACTIVE_LINK_CLASS = 'has-background-grey-lighter';

export const Navbar = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.toString();

  const peopleLink = {
    pathname: '/people',
    search: pathname.startsWith('/people') && currentSearch ? `?${currentSearch}` : '',
  };

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
            to="/"
            end
            className={({ isActive }) =>
              `navbar-item ${isActive ? ACTIVE_LINK_CLASS : ''}`.trim()
            }
          >
            Home
          </NavLink>

          <NavLink
            to={peopleLink}
            className={({ isActive }) =>
              `navbar-item ${isActive ? ACTIVE_LINK_CLASS : ''}`.trim()
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
