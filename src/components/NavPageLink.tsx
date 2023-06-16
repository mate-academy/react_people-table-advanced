import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const NavPageLink:FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (
        isActive ? 'has-background-grey-lighter navbar-item' : 'navbar-item'
      )}
      aria-current="page"
    >
      {text}
    </NavLink>
  );
};
