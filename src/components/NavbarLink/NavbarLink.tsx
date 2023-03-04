import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
}
export const NavbarLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
