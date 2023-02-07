import React, { memo } from 'react';
import classnames from 'classnames';

import { NavLink } from 'react-router-dom';

type ToObject = {
  pathname: string;
  search: string;
};

type Props = {
  to: ToObject | string;
  text: string;
};

export const PageNavLink: React.FC<Props> = memo(({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classnames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
));
