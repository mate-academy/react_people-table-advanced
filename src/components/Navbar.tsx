import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const createNavLink = (to: string, text: string) => (
    <NavLink
      aria-current="page"
      className={
        ({ isActive }) => cn(
          'navbar-item', {
            'has-background-grey-lighter': isActive,
          },
        )
      }
      to={to}
    >
      {text}
    </NavLink>
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
          {createNavLink('/', 'Home')}
          {createNavLink('/people', 'People')}
        </div>
      </div>
    </nav>
  );
};
