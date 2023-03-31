import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  title: string;
};

export const NavbarLink: React.FC<Props> = ({ link, title }) => (
  <NavLink
    to={link}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {title}
  </NavLink>
);
