import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

interface Props {
  to: string;
  text: string;
}

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);
