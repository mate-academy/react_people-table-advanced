import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <header className="border bg-light">
        <div className="container">
          <nav className="nav nav-pills p-3">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="people">People</NavLink>
          </nav>
        </div>
      </header>

      <Outlet />
    </>
  );
};
