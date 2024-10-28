import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  const links = [
    { to: '/', label: 'Home' },
    { to: '/people', label: 'People' },
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
          <ul className="navbar-menu">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  className={getLinkClass}
                  to={to}
                  aria-current={window.location.pathname === to ? 'page' : undefined}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
