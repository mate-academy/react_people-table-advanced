import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
}

export const CustomNavLink: React.FC<PropsWithChildren<Props>>
  = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {children}
    </NavLink>
  );
