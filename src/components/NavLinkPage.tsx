import React from 'react';
import { NavLink, To } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: To,
  text: string,
};

export const NavLinkPage: React.FC<Props> = React.memo(({ to, text }) => (
  <NavLink
    className={({ isActive }) => {
      return classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      });
    }}
    to={to}
  >
    {text}
  </NavLink>
));
