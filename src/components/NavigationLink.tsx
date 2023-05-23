import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string
}

export const NavigationLink:FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      aria-current="page"
      className={({ isActive }) => classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
      to={to}
    >
      {text}
    </NavLink>
  );
};
