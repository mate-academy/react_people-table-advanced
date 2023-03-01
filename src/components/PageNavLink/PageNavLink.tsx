import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { memo } from 'react';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = memo(({ to, text }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={to}
  >
    {text}
  </NavLink>
));
