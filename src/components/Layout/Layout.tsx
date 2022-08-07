import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="container is-fluid">
          <nav className="tabs">
            <ul>
              <li className="nav-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/people">People</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="section">
        <div className="container is-fluid">
          <Outlet />
        </div>
      </section>

      <footer className="footer">
        <h2>Made in Ukraine @ 2022</h2>
      </footer>
    </>
  );
};
