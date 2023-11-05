import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import '../App.scss';

const getLinksClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item ', {
    'has-background-grey-lighter': isActive,
  });
};

export const Navbar = () => {
  const { search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinksClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinksClass}
            to={{
              pathname: '/people',
              search,
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
