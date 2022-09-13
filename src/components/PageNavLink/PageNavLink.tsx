import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type TProps = {
  to: string;
  title: string;
};

export const PageNavLink: React.FC<TProps> = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )}
    >
      {title}
    </NavLink>
  );
};
