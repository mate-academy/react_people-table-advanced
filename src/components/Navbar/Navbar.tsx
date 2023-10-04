import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NavLinks } from '../../types/NavLinks';

type Link = {
  isActive: boolean;
};

const getLinkClass = ({ isActive }: Link) => (
  classNames('navbar-item', { 'has-background-grey-lighter': isActive })
);

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={getLinkClass}
          to={NavLinks.Home}
        >
          Home
        </NavLink>

        <NavLink
          className={getLinkClass}
          to={NavLinks.People}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
