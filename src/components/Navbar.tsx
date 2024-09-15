import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const hasActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav data-cy="nav">
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={hasActiveLink} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={hasActiveLink} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
