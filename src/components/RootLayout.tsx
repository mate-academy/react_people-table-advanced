import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

export const RootLayout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getLinkClass}
              to={{
                pathname: '/people',
                search: location.search,
              }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </>
  );
};
