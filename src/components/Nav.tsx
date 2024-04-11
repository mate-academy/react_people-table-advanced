import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const setIsActive = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Nav: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink key="home" className={setIsActive} to="/">
            Home
          </NavLink>

          <NavLink key="people" className={setIsActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
