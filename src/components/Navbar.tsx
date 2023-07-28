import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const linkClassNames = (
  { isActive } : { isActive : boolean },
) => classNames('navbar-item', {
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
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={linkClassNames} to="/">
            Home
          </NavLink>

          <NavLink
            className={linkClassNames}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
