import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Options {
  isActive: boolean;
}

export const Navbar = () => {
  const isActiveClass = ({ isActive }: Options) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveClass} to="/">
            Home
          </NavLink>

          <NavLink aria-current="page" className={isActiveClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
