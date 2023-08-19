/* eslint-disable max-len */
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const isActiveButton = ({ isActive }: { isActive: boolean }) => classNames({ 'navbar-item': true, 'has-background-grey-lighter': isActive });

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
          <NavLink className={isActiveButton} to=".">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isActiveButton} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
