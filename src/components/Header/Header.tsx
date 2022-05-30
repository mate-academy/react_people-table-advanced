import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="header">
    <nav className="nav">
      <Link className="nav__link" to="/">Home page</Link>
      <Link className="nav__link" to="/people">People page</Link>
    </nav>
  </header>
);
