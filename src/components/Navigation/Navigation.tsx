import { FC } from 'react';
import { NavigationLink } from '../NavigationLink';

export const Navigation: FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="people">People</NavigationLink>
      </div>
    </div>
  </nav>
);
