import {
  NavLink,
} from 'react-router-dom';
import classNames from 'classnames';

type IsActiveClassChangerType = {
  isActive: boolean;
};

const isActiveClassChanger = (
  { isActive }: IsActiveClassChangerType,
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
          <NavLink
            to="/"
            className={isActiveClassChanger}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={isActiveClassChanger}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
