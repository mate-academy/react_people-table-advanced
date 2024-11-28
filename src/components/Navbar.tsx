import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#485fc7' : '',
  });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} style={getLinkStyle} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkClass} style={getLinkStyle} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
