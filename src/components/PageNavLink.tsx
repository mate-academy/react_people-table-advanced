import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  url: string;
  title: string;
};

export const PageNavLink: FC<Props> = ({ url, title }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={url}
  >
    {title}
  </NavLink>
);
