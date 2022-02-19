import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="Header">
    <nav className="Header__Nav">
      <Link to="/" className="Header__Link">Home Page</Link>

      <Link to="people">People</Link>
    </nav>
  </header>
);
