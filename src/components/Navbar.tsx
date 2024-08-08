import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getNavLinkClass}
            to={{ pathname: '/people', search: searchParams.toString() }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
