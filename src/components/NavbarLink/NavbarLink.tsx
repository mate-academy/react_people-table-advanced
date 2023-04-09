import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

interface Props {
  link: string,
  title: string,
}

export const NavbarLink: FC<Props> = ({ link, title }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {title}
    </NavLink>
  );
};
