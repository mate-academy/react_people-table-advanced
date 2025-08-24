import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

const navItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'People', path: '/people' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navItems.map(navItem => {
            let path = navItem.path;

            if (navItem.path === '/people') {
              path += location.search;
            }

            return (
              <NavLink key={navItem.id} className={getNavLinkClass} to={path}>
                {navItem.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
