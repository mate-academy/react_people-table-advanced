import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = () => {
  const getActiveLink = ({ isActive }: { isActive: boolean }) => (
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={getActiveLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getActiveLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
