import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Status = {
  isActive: boolean;
};

const getNavLinkClassName = ({ isActive }: Status) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const Navbar = () => {
  const location = useLocation();
  console.log('location', location.pathname);

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getNavLinkClassName}
            to={{ pathname: 'people', search: location.search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
