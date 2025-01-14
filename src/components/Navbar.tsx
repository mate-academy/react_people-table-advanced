import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  return (
    <nav data-cy="nav" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/people" aria-current="page" className={linkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
