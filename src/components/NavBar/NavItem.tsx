import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  navItem: string,
  link: string,
}

export const NavItem: React.FC<Props> = ({ navItem, link }) => (
  <NavLink
    to={link}
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {navItem}
  </NavLink>
);
