import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface To {
  pathname: string;
  search: string;
}

interface Props {
  to: To | string;
  navTitle: string;
}

export const PageNavLink: React.FC<Props> = React.memo(
  ({ to, navTitle }) => (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {navTitle}
    </NavLink>
  ),
);
