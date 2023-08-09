import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  content: string;
};

export const PageNavLink: React.FC<Props> = ({ to, content }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {content}
    </NavLink>
  );
};
