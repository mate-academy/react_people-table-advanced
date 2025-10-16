import React from 'react';
import { SearchLink } from './SearchLink';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <SearchLink to="/" params={{}}>
            Home
          </SearchLink>
        </li>
        <li>
          <SearchLink to="/people" params={{}}>
            People
          </SearchLink>
        </li>
      </ul>
    </nav>
  );
};
