import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const NavBarLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
