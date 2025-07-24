import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navbar-brand">
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          classNames('navbar-item', {
            'has-background-grey-lighter': isActive,
          })
        }
      >
        Home
      </NavLink>
      <NavLink
        to={'/people'}
        className={({ isActive }) =>
          classNames('navbar-item', {
            'has-background-grey-lighter': isActive,
          })
        }
      >
        People
      </NavLink>
    </div>
  );
};
