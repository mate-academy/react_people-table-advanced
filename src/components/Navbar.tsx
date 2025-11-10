import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getClasses = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClasses}>
            Home
          </NavLink>

          <NavLink
            to={{ pathname: '/people', search: location.search }}
            className={getClasses}
          >
            People
          </NavLink>

          {/*
            aria-current="page"

            I don't know what is that and how to use it.
            it just was inside People link right from the beggining.
          */}
        </div>
      </div>
    </nav>
  );
};
