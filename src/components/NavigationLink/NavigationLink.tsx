import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const NavigationLink: FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      aria-current="page"
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={to}
    >
      {title}
    </NavLink>
  );
};
