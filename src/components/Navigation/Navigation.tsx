import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export type Props = {
  to: string;
  text: string;
};

export const Navigation: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);
