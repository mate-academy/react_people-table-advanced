import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const linkClicked = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
            <NavLink className={linkClicked} to="/">
              Home
            </NavLink>

            <NavLink className={linkClicked} to="people">
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
