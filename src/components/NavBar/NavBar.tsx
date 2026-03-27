import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          <NavLink to={{ pathname: '/people', search }} className={navClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

/*export const Navbar = () => {
 - return (
   - <nav
    -  data-cy="nav"
    -  className="navbar is-fixed-top has-shadow"
    -  role="navigation"
    -  aria-label="main navigation"
   - >
    -  <div className="container">
       - <div className="navbar-brand">
          <a className="navbar-item" href="#/">
            Home
          </a>

          <a
            aria-current="page"
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};*/
