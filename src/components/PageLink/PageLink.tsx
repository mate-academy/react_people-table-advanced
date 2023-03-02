import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  text: string,
};

export const PageLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={to}
  >
    {text}
  </NavLink>
);
