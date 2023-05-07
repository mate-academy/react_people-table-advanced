import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  path: string;
  text: string;
  className: string;
};

export const PageNavLink: FC<Props> = ({
  path,
  text,
  className,
}) => (
  <NavLink
    to={path}
    className={({ isActive }) => classNames(className, {
      'has-background-grey-lighter': isActive,
    })}
  >
    {text}
  </NavLink>
);
