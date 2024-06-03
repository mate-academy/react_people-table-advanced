import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
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
