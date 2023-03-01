import React from 'react';
import { Navigation } from '../Navigation/Navigation';

export const Navbar = React.memo(
  () => {
    return (
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Navigation to="/" text="Home" />
            <Navigation to="people" text="People" />
          </div>
        </div>
      </nav>
    );
  },
);
