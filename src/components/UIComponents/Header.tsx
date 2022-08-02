import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header: FC = () => (
  <header className="Header">
    <NavLink to="/">Home </NavLink>
    <NavLink to="/people">People </NavLink>
  </header>
);
