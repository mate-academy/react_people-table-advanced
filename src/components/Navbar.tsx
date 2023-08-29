import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getClassForLinkPages = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClassForLinkPages}>Home</NavLink>
          <NavLink
            aria-current="page"
            to="/people"
            className={getClassForLinkPages}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
