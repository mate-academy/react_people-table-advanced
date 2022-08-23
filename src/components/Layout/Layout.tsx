import { Outlet } from 'react-router-dom';
import './Layout.scss';
import { NavbarLink } from '../NavbarLink';

export const Layout = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar has-shadow default__navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/people">People</NavbarLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
