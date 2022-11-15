import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type Props = {
  to: string
  text: string
};

const NavLinkItem: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);

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
          <NavLinkItem to="/" text="Home" />
          <NavLinkItem to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
