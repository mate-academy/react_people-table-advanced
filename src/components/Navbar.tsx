import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const getClassName = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
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
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getClassName}
            to={{
              pathname: '/people',
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
