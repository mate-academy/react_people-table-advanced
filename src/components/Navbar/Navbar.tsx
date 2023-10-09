import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">

          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={{
              pathname: 'people',
              search: searchParams.toString(),
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
