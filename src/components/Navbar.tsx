/* eslint-disable no-nested-ternary */
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive, isPending }) => (
              isPending ? 'navbar-item' : isActive
                ? 'navbar-item has-background-grey-lighter' : 'navbar-item')}
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive, isPending }) => (
              isPending ? 'navbar-item' : isActive
                ? 'navbar-item has-background-grey-lighter' : 'navbar-item')}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
