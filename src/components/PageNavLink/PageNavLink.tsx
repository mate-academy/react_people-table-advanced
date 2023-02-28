import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: {
    pathname: string,
    search: string,
  }
  text: string,
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      classNames('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
  >
    {text}
  </NavLink>
);
