import cn from 'classnames';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

interface NavigationObject {
  to: string;
  children: ReactNode;
}

const navigation: NavigationObject[] = [
  {
    to: '/',
    children: 'Home',
  },

  {
    to: '/people',
    children: 'People',
  },
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
          {navigation.map(({ to, children }) => (
            <NavLink key={to} className={getNavLinkClass} to={to}>
              {children}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
