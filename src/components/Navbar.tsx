import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar: FC = () => {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })
  );

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
            to="/"
            className={getLinkClasses}
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={getLinkClasses}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
