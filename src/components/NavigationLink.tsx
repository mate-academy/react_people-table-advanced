import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
};

export const NavigationLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        ({ 'has-background-grey-lighter': isActive }),
      )}
    >
      {title}
    </NavLink>
  );
};
