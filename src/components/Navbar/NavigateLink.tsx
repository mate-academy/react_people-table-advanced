import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  title: string,
  path: string,
};

export const NavigateLink: FC<Props> = ({ title, path }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={path}
    replace
  >
    {title}
  </NavLink>
);
