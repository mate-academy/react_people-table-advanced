import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import { applyClassNames } from '../../utils/applyClassNames';

interface Props {
  to: string;
}

export const NavbarLink: FC<Props> = ({ children, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      applyClassNames(
        isActive,
        'has-background-grey-lighter',
        'navbar-item',
      )
    )}
  >
    {children}
  </NavLink>
);
