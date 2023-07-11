import cn from 'classnames';
import { NavLink, To } from 'react-router-dom';

type Props = {
  to: To,
  text: string,
};

export const NavbarLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item', {
        'has-background-grey-lighter': isActive,
      },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
