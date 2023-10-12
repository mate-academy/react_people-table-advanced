import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  text: string
};
export const PageNavLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('navbar-item',
        { 'has-background-grey-lighter': isActive })}
    >
      {text}
    </NavLink>
  );
};
