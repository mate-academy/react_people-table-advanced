import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export type PropsNavLink = {
  to: string,
  name: string,
};

export const NavigationLink: React.FC<PropsNavLink> = ({ to, name }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={to}
  >
    {name}
  </NavLink>
);
