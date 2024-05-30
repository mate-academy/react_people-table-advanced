import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type TActive = { isActive: boolean };

const getActiveClass = ({ isActive }: TActive) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getActiveClass}>
            Home
          </NavLink>

          <NavLink to="people" aria-current="page" className={getActiveClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
