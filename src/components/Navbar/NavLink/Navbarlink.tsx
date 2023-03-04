import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: {
    pathname: string,
    search: string,
  }
  text: string,
};

export const NavbarLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      cn('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
  >
    {text}
  </NavLink>
);
