import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      cn('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
  >
    {text}
  </NavLink>
);
