import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

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
          {[
            { name: 'Home', to: '/' },
            { name: 'People', to: 'people' },
          ].map(({ name, to }) => (
            <NavLink
              key={name}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to={to}
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
