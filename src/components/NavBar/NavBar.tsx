import { FC } from 'react';
import { NavigationLink } from '../NavigationLink';

export const NavBar: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink
          to="/"
          content="Home"
        />

        <NavigationLink
          to="people"
          content="People"
        />
      </div>
    </div>
  </nav>
);
