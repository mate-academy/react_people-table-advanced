import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              className={`navbar-item ${pathname === '/' && 'has-background-grey-lighter'}`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${pathname.includes('/people') && 'has-background-grey-lighter'}`}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
