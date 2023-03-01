import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  children: string;
  to: string;
};

export const NavigationLink: React.FC<Props> = ({ children, to }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item ',
      {
        'has-background-grey-lighter': isActive,
      },
    )}
    to={to}
  >
    {children}
  </NavLink>
);
