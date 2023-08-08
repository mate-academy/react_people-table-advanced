import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const makeClassNames = ({ isActive }: { isActive: boolean }): string => (
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Navigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={makeClassNames}
        >
          Home
        </NavLink>

        <NavLink
          to="people"
          className={makeClassNames}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
