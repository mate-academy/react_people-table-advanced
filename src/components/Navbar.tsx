import React from 'react';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const path = useLocation().pathname;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className={`navbar-item ${path.includes('home') || path === '/' ? 'has-background-grey-lighter' : ''}`}
            href="#/"
          >
            Home
          </a>

          <a
            aria-current="page"
            className={`navbar-item ${path.includes('people') ? 'has-background-grey-lighter' : ''}`}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
