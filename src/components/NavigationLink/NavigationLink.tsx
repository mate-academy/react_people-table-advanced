import { FC, ReactNode } from 'react';
import { To, NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: To;
  children: ReactNode;
};

export const NavigationLink: FC<Props> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {children}
  </NavLink>
);
