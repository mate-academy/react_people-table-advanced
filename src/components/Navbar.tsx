import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
type Props = {};

export const Navbar: React.FC<Props> = props => {
  const {} = props;

  const linkStatus = ({ isActive }: { isActive: boolean }) => {
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
          <NavLink className={linkStatus} to="/">
            Home
          </NavLink>

          <NavLink className={linkStatus} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
