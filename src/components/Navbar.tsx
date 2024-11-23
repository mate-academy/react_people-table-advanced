import React from 'react';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const path = useLocation().pathname;
  const isHomePage = path.includes('home') || path === '/';
  const isPeoplePage = path.includes('people');

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
            className={`navbar-item ${isHomePage ? 'has-background-grey-lighter' : ''}`}
            href="#/"
          >
            Home
          </a>

          <a
            aria-current="page"
            className={`navbar-item ${isPeoplePage ? 'has-background-grey-lighter' : ''}`}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
