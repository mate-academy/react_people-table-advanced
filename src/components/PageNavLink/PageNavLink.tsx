import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
};

export const PageNavLink: React.FC<Props> = React.memo(({ text, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )
    )}
  >
    {text}
  </NavLink>
));
