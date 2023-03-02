import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const setNavLink = (to: string, title: string) => {
    return (
      <NavLink
        className={({ isActive }) => classNames(
          'navbar-item', {
            'has-background-grey-lighter': isActive,
          },
        )}
        to={to}
      >
        {title}
      </NavLink>
    );
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
          {setNavLink('/', 'Home')}
          {setNavLink('/people', 'People')}
        </div>
      </div>
    </nav>
  );
};
