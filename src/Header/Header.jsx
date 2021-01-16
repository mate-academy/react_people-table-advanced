import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <div className="Header">
    <NavLink to="/" exact className="home">
      <h3>Home</h3>
    </NavLink>
    <NavLink to="/people" className="people">
      <h3>People</h3>
    </NavLink>
  </div>
);
