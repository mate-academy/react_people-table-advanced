import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/people' && location.pathname.startsWith('/people'));

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className={`navbar-item ${isActive('/') ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`navbar-item ${isActive('/people') ? 'has-background-grey-lighter' : ''}`}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
