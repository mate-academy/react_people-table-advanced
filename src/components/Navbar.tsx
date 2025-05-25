import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/people', label: 'People' },
] as const;

const getNavItemClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} className={getNavItemClass}>
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);
