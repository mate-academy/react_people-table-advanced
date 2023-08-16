import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  page: string,
  to: string,
};

export const Navbar: FC<Props> = ({ page, to }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={to}
  >
    {page}
  </NavLink>
);
