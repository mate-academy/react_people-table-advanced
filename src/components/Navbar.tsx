import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { search } = useLocation();

  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to={{ pathname: '/people', search }} className="navbar-item">
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
