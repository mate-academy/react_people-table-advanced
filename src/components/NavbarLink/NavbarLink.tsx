import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
}

export const NavbarLink: FC<Props> = ({ to, name }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={to}
  >
    {name}
  </NavLink>
);
