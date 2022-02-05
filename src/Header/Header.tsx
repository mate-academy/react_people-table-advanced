import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <nav className="nav">
        <NavLink
          className="nav__link"
          to="/"
          end
        >
          Home Page
        </NavLink>
        <NavLink
          className="nav__link"
          to="/people"
        >
          People Page
        </NavLink>
      </nav>
    </div>
  );
};
