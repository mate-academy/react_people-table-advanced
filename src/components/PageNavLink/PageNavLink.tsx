import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  name: string;
};

export const PageNavLink: FC<Props> = memo(({ to, name }) => {
  const handlerActiveLink = (isActive: boolean) => {
    return cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => handlerActiveLink(isActive)}
    >
      {name}
    </NavLink>
  );
});
