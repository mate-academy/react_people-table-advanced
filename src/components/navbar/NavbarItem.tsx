import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  to: string;
};

export const NavbarItem: React.FC<Props> = ({ title, to }) => (
  <NavLink
    aria-current="page"
    className={({ isActive }) =>
      classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })
    }
    to={to}
  >
    {title}
  </NavLink>
);
