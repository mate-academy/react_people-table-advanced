import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { search } = useLocation();

  const isActiveStyle = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink end className={isActiveStyle} to="/">
            Home
          </NavLink>

          <NavLink className={isActiveStyle} to={`/people${search}`}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
