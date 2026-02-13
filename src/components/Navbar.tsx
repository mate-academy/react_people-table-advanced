import { NavLink, useLocation, type To } from 'react-router-dom';

import classNames from 'classnames';
import { AppPath } from '../types/paths';

interface NavLinkProp {
  className: ({ isActive }: { isActive: boolean }) => string;
  to: To;
  text: string;
}

const NavBar = () => {
  const location = useLocation();
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  const peopleTo: To = location.pathname.startsWith(AppPath.People)
    ? { pathname: AppPath.People, search: location.search }
    : AppPath.People;

  const navLinks: NavLinkProp[] = [
    {
      className: linkClassName,
      to: '/',
      text: 'Home',
    },
    {
      className: linkClassName,
      to: peopleTo,
      text: 'People',
    },
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
          {navLinks.map(({ className, to, text }) => (
            <NavLink key={text} className={className} to={to}>
              {text}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
