import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar: FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', {
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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" aria-current="page" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
