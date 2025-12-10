import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const suffix = location.search;

  const navLinks = [
    {
      to: `/`,
      name: 'Home',
    },
    {
      to: `/people${suffix}`,
      name: 'People',
    },
  ];

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navLinks.map(el => (
            <NavLink
              to={el.to}
              key={el.to}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  ['has-background-grey-lighter']: isActive,
                })
              }
            >
              {el.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
