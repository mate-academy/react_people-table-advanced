import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => (
  <nav className="navbar navbar-expand-lg bg-light justify-content-center">
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link to='/' className="nav-link text-UC">home</Link>
      </li>
      <li className="nav-item">
        <Link to='/people' className="nav-link text-UC">people</Link>
      </li>
    </ul>
  </nav>
);
