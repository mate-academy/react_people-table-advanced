import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string
};

export const NavbarLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};
