import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar: React.FC = React.memo(() => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass({ isActive: false })} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkClass({ isActive: false })} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
});
