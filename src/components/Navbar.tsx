import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const activ
= ({ isActive } : { isActive: boolean }) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink className={activ} to="/">Home</NavLink>

          <NavLink
            className={activ}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
