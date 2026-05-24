import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavClassName} to={{ pathname: '/', search }}>
            Home
          </NavLink>

          <NavLink
            className={getNavClassName}
            to={{ pathname: '/people', search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
