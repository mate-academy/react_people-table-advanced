import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Links } from '../types/Links';

type Props = {
  title: Links;
};

export const NavigationLink: React.FC<Props> = ({ title }) => (
  <NavLink
    to={title.toLocaleLowerCase()}
    className={({ isActive }) => {
      return cn('navbar-item', { 'has-background-grey-lighter': isActive });
    }}
  >
    {title === Links.home ? 'Home' : title}
  </NavLink>
);
