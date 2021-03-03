import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg bg-light justify-content-center">
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link to='/' className="nav-link">HOME</Link>
      </li>
      <li className="nav-item">
        <Link to='/people' className="nav-link">PEOPLE</Link>
      </li>
    </ul>
  </nav>
);
