import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  link: string;
  text: string;
};

export const NavigationLink: React.FC<Props> = ({ link, text }) => (
  <NavLink
    to={link}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);
