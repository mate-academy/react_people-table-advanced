import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
);

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
          <NavLink
            to="/"
            className={getNavLinkClass}
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
        </div>
      </div>
    </nav>
  );
};
