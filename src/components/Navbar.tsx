import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const setActiveClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  {
    'has-background-grey-lighter': isActive,
  },
);

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={setActiveClass}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={setActiveClass}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
