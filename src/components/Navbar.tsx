import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [activePage, setActivePage] = useState('home');

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
            className={`navbar-item ${activePage === 'home' ? 'has-background-grey-lighter' : ''}`}
            to="#/"
            onClick={() => setActivePage('home')}
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={`navbar-item ${activePage === 'people' ? 'has-background-grey-lighter' : ''}`}
            to="#/people"
            onClick={() => setActivePage('people')}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
