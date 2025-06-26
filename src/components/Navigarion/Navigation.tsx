import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = () => {
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
            className={({ isActive }) =>
              cn('navbar-item', {
                ' has-background-grey-lighter': isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn('navbar-item', {
                ' has-background-grey-lighter': isActive,
              })
            }
            to={{ pathname: '/people', search: searchParams.toString() }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
