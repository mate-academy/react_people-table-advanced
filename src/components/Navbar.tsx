import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={navigationClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={navigationClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
