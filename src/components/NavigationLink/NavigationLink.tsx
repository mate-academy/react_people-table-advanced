import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
}

export const NavigationLink: FC<Props> = React.memo(({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={to}
  >
    {text}
  </NavLink>
));
