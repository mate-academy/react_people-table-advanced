import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames(
  'navbar-item',
  { 'navbar-item has-background-grey-lighter': isActive },
);

export const NavBar = () => (
  <>
    <NavLink
      className={getLinkClass}
      to="/"
    >
      Home
    </NavLink>

    <NavLink
      className={getLinkClass}
      to="/people"
    >
      People
    </NavLink>
  </>
);
