import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
