import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classnames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
    aria-current="page"
  >
    {text}
  </NavLink>
);
