import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <header className="mb-5">
        <nav className="nav nav-pills nav-fill p-3 bg-light border rounded-4">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="people">People</NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
