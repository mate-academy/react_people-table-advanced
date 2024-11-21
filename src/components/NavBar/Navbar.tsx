import { NavLink, useLocation } from 'react-router-dom';

import { getLinkClass } from '../../utils/getLinkClass';

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
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={{ pathname: '/people', search }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
