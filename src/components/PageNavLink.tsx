import React, { memo } from 'react';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = memo(({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
));
