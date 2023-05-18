import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  to: string | { pathname: string; search: string; };
  text: string;
}

export const NavbarLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
