import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item ', {
    'has-background-grey-lighter': isActive,
  });

const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'red' : '',
});

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
          <NavLink to="/" className={getLinkClass} style={getLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass} style={getLinkStyle}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
