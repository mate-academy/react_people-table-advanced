import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const links = ['Home', 'People'];

const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  }));

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {links.map(link => (
          <NavLink
            key={link}
            className={getLinkNavClass}
            to={link === 'Home' ? '/' : '/people'}
          >
            {link}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);
