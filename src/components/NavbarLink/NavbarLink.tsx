import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string,
  text: string,
};

export const NavbarLink: React.FC<Props> = ({ path, text }) => (
  <NavLink
    aria-current="page"
    to={path}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);
