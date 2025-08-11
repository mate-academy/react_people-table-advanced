import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: FC = () => {
  const setNavClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={setNavClasses}>
            Home
          </NavLink>

          <NavLink to="/people" className={setNavClasses}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
