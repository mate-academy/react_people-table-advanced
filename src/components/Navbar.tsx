import * as RRD from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (cn(
  'navbar-item', { 'has-background-grey-lighter': isActive },
));

export const Navbar = () => {
  const [searchParams] = RRD.useSearchParams();
  const { state } = RRD.useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <RRD.NavLink
            to="/"
            state={{ search: searchParams.toString() }}
            className={getLinkClass}
          >
            Home
          </RRD.NavLink>

          <RRD.NavLink
            to={{
              pathname: '/people',
              search: state?.search,
            }}
            className={getLinkClass}
          >
            People
          </RRD.NavLink>
        </div>
      </div>
    </nav>
  );
};
