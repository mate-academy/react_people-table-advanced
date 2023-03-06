import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string;
};

export const NavBarLink: React.FC<Props> = ({ to, name }) => (
  <NavLink
    className={({ isActive }) => (
      classNames('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
    to={to}
  >
    {name}
  </NavLink>
);
