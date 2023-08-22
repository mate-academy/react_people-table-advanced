import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navLinkIsActive = ({ isActive }: { isActive: boolean }) => (
    classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    ));

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={navLinkIsActive}>
            Home
          </NavLink>

          <NavLink to="people" className={navLinkIsActive}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
