import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <nav className="Header__nav">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive
            ? 'Header__link Header__link--active'
            : 'Header__link'
          )}
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive }) => (isActive
            ? 'Header__link Header__link--active'
            : 'Header__link'
          )}
        >
          People
        </NavLink>
      </nav>
    </div>
  );
};
