import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__link">
        Home Page
      </NavLink>

      <NavLink to="/people" className="header__link">
        People Page
      </NavLink>
    </header>
  );
};
