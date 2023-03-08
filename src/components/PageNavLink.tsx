import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={to}
  >
    {text}
  </NavLink>
);
