import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface Props{
  path: string,
  label: string,
}

export const NavigationLink: React.FC<Props> = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => cn(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
    >
      {label}
    </NavLink>
  );
};
