import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  content: string;
};

export const NavBarLink:React.FC<Props> = ({ to, content }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {content}
    </NavLink>
  );
};
