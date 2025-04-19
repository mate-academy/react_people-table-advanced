import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const isActiveLink = (isActive: boolean) => {
    if (isActive) {
      return 'navbar-item has-background-grey-lighter';
    }

    return 'navbar-item';
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
          <NavLink className={({ isActive }) => isActiveLink(isActive)} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) => isActiveLink(isActive)}
            to={{ pathname: '/people', search: searchParams.toString() }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
