import { NavLink, useSearchParams } from 'react-router-dom';

const isActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

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
          <NavLink className={isActiveClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={isActiveClass}
            to={{ pathname: "/people", search: searchParams.toString()}}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
