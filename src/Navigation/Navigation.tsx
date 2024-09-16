import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPeople = location.pathname.startsWith('/people');

  return (
    <nav className="navbar is-fixed-top has-shadow" data-cy="nav">
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${isHome ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={`navbar-item ${isPeople ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
