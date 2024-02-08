import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const links = [
  { title: 'Home', path: '/' },
  { title: 'People', path: 'people' },
];

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
          {links.map(({ title, path }) => (
            <NavLink
              key={title}
              to={path}
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              {title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
