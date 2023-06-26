/* eslint-disable max-len */
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      aria-current="page"
      className={({ isActive }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive })}
      to={to}
    >
      {text}
    </NavLink>
  );
};
