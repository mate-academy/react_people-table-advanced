import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item',
    {
      'has-background-grey-lighter': isActive,
    })
);

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
          <NavLink className={getActiveLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getActiveLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
