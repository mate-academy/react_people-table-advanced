import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  content: string;
};

export const PageNavLink:React.FC<Props> = ({ to, content }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (
        isActive ? 'has-background-grey-lighter navbar-item' : 'navbar-item'
      )}
      aria-current="page"
    >
      {content}
    </NavLink>
  );
};
