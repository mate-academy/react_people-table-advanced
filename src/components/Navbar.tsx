import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getItemClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getItemClass} to="/">
              Home
            </NavLink>

            <NavLink className={getItemClass} to="people">
              People
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
