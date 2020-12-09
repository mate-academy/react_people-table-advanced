import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="nav">
      <NavLink to="/" exact className="nav-item" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/people" className="nav-item" activeClassName="active">
        People
      </NavLink>
    </nav>
  </header>
);

export default Header;
