import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  }

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
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            className={getNavLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
