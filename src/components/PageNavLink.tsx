import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Prop = {
  to: string;
  text: any;
};

export const PageNavLink: FC<Prop> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {text}
  </NavLink>
);
