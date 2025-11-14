import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const activLink = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
          <NavLink className={activLink} to="/">
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            aria-current="page"
            className={activLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
