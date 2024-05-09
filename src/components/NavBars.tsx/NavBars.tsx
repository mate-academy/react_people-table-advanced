import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getClassLink = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

const NavBars = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClassLink}>
            Home
          </NavLink>

          <NavLink to="people" className={getClassLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBars;
