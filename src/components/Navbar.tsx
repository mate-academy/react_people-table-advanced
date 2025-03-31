import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

enum EnumLinks {
  Home,
  People,
}
const Links = Object.values(EnumLinks).filter(link => typeof link === 'string');

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

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
          {Links.map(link => {
            const path = link === 'Home' ? '' : link.toLowerCase();

            return (
              <NavLink
                key={link}
                aria-current="page"
                to={`/${path}`}
                className={getLinkClassName}
              >
                {link}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
