import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const getNavClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
);

export const Navigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="
      navbar
      is-light
      is-fixed-top
      is-mobile
      has-shadow"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" className={getNavClass}>
          Home
        </NavLink>

        <NavLink to="/people" className={getNavClass}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
