import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header: React.FC = () => (
  <div className="header">
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/home">Home page</Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/people">People page</Link>
        </li>
      </ul>
    </nav>
  </div>
);
