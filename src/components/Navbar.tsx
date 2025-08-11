// components/Navbar.tsx
import React from 'react';

type NavbarProps = {
  currentPath: string;
};

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {/* Home Link */}
          <a
            className={`navbar-item ${
              currentPath === '' || currentPath === '#' || currentPath === '#/'
                ? 'has-background-grey-lighter'
                : ''
            }`}
            href="#/"
          >
            Home
          </a>

          {/* People Link */}
          <a
            className={`navbar-item ${
              currentPath.startsWith('#/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
