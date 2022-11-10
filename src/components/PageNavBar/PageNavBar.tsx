import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  text: string;
};

export const PageNavBar: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);
