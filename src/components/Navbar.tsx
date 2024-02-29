import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'People', link: '/people' },
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
          {navLinks.map(({ name, link }) => (
            <NavLink
              key={name}
              to={link}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
