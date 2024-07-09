import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const NAVBAR_DATA = {
  Home: '/',
  People: '/people',
};

export const Navbar = () => (
  <div className="container">
    <div className="navbar-brand">
      {Object.entries(NAVBAR_DATA).map(([title, href]) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
        >
          {title}
        </NavLink>
      ))}
    </div>
  </div>
);
