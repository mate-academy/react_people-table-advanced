import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const styleLink = ({ isActive }: { isActive: boolean }) => cn('navbar-item',
    { 'has-background-grey-lighter': isActive });

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
            className={styleLink}
          >
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={styleLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
