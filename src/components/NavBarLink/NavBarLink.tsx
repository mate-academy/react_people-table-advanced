import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string,
  children: string
}

export const NavBarLink: React.FC<Props> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )
    )}
  >
    {children}
  </NavLink>
);
