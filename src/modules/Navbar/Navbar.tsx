import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

function getLinkClass({ isActive }: { isActive: boolean }): string {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
}

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams ? `?${searchParams}` : '';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink
            to={`/people${search}`}
            aria-current="page"
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
