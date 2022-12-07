import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { slugContext } from './slugContext';

export const Navbar = () => {
  const { setSelectedSlug } = useContext(slugContext);

  const handleSetSlug = () => (setSelectedSlug && setSelectedSlug(''));

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="/"
            onClick={handleSetSlug}
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
